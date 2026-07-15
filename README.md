# RideFlow (User + Captain Ride Booking)

## Overview
RideFlow is a ride-hailing style app with:
- **Users**: register/login, choose pickup & destination, select vehicle type, request rides.
- **Captains**: register/login, stay online, receive nearby ride requests in real-time, accept/arrive, start/end rides.
- **Maps & Routing**: address geocoding, distance/time calculation, route geometry.
- **Real-time updates**: uses **Socket.IO** to notify users/captains of ride lifecycle events.

---

## Project Structure
- **Server**: `server/src`
  - Routes: `server/src/routes/*`
  - Controllers: `server/src/controllers/*`
  - Services: `server/src/services/*`
  - Middleware: `server/src/middleware/*`
  - Socket: `server/src/socket/socket.js`
  - DB: `server/src/database/*`
- **Client**: `client/src`
  - Routing: `client/src/App.jsx`
  - Pages: `client/src/pages/*`
  - Components: `client/src/components/*`
  - Context: `client/src/Context/*`

---

## Server API
Base URL mounting (from `server/src/app.js`):
- `/api/v1/auth` → user auth routes
- `/api/v1/captain` → captain auth routes
- `/api/v1/maps` → map/routing routes
- `/api/v1/ride` → ride routes

### Auth Middleware (JWT via cookie or Authorization header)
- **User JWT**: `server/src/middleware/userAuth.middleware.js`
  - Reads token from `req.cookies.token` or `Authorization: Bearer <token>`
  - Loads user from `users` table and sets `req.user`
- **Captain JWT**: `server/src/middleware/captainAuth.middleware.js`
  - Reads token similarly
  - Loads captain from `captains` table and sets `req.captain`

### Request validation
- `server/src/middleware/validate.middleware.js` uses Zod schemas and returns the first validation error.

---

## Routes (All server endpoints)

### 1) User Auth
File: `server/src/routes/user.routes.js`

#### `POST /api/v1/auth/register`
- Body: validated by `registerSchema` (see `server/src/validators/user.validator.js`)
- Creates user, returns token (set in HTTP-only cookie) and user data.

#### `POST /api/v1/auth/login`
- Body: validated by `loginSchema`
- Logs in user, returns token (set in cookie).

#### `GET /api/v1/auth/getuser`
- Auth: **User JWT** (`verifyUserJWT`)
- Response: user profile from `users` table.

#### `POST /api/v1/auth/logout`
- Clears cookie: `token`.

---

### 2) Captain Auth
File: `server/src/routes/captain.routes.js`

#### `POST /api/v1/captain/register`
- Body validated by `registerCaptainSchema`
- Creates captain and sets cookie token.

#### `POST /api/v1/captain/login`
- Body validated by `loginCaptainSchema`
- Logs in captain and sets cookie token.

#### `GET /api/v1/captain/getcaptain`
- Auth: **Captain JWT** (`verifyCaptainJWT`)
- Returns captain profile from `captains` table.

#### `POST /api/v1/captain/logout`
- Clears cookie: `token`.

---

### 3) Map / Geocoding / Routing
File: `server/src/routes/map.routes.js`

#### `POST /api/v1/maps/coordinates`
- Auth: **User JWT**
- Body: `{ address }`
- Output: `{ lat, lng }`
- Service: `server/src/services/map.service.js` (Nominatim)

#### `GET /api/v1/maps/distance-time?origin=...&destination=...`
- Auth: **User JWT**
- Output: `{ distance, duration, distanceText, durationText }`
- Service: OSRM (`router.project-osrm.org`)

#### `GET /api/v1/maps/route?pickup=...&destination=...`
- Auth: **User JWT**
- Output: route geometry coordinates and distance/duration
- Uses OSRM with `geometries=geojson`

#### `GET /api/v1/maps/get-suggestion?input=...`
- No auth
- Output: list of suggestions from Photon Komoot API

---

### 4) Rides
File: `server/src/routes/ride.routes.js`

#### `GET /api/v1/ride/fare?pickup=...&destination=...`
- Auth: **User JWT**
- Output: `{ Price: <calculated object> }`
- Service: `RideService.calculateFare(distance, duration)`

#### `POST /api/v1/ride/create`
- Auth: **User JWT**
- Body: `{ pickup, destination, vehicleType }`
- Creates a ride and:
  1. Geocodes pickup
  2. Finds nearby captains within 15km (from `getNearbyCaptains(lat, lng, 15)`)
  3. Filters captains by `vehicle_type === vehicleType`
  4. Sends Socket.IO event to each matched captain: `new-ride`
     - Payload includes ride + user details.

#### `GET /api/v1/ride/available-vehicles?pickup=...`
- Auth: **User JWT**
- Body/Query: pickup
- Finds nearby captains, returns unique available `vehicle_type` values.

#### `PATCH /api/v1/ride/update-status`
- Auth: **Captain JWT**
- Body: `{ rideId, status, captainId }`
- Updates ride status via `RideService.changeStatus(...)`
- Emits Socket.IO events to user depending on status:
  - `status === 'accepted'` → emit `ride-confirmed`
  - `status === 'arrived'` → emit `ride-arrived` with `{ rideId: updatedRide.id }`

#### `GET /api/v1/ride/:rideId/info`
- Auth: **User JWT**
- Returns ride details (`RideService.getRideDetails(rideId)`)

#### `POST /api/v1/ride/start-ride`
- Auth: **Captain JWT**
- Body: `{ rideId, captainId, otp }`
- Updates ride to started (`RideService.startRide(...)`)
- Emits Socket.IO event to user: `ride-started` with `{ rideId }`

#### `POST /api/v1/ride/end-ride`
- Auth: **Captain JWT**
- Body: `{ rideId, captainId }`
- Updates ride to completed (`RideService.endRide(...)`)
- Emits Socket.IO event to user: `ride-completed` with a payment/order payload

---

## Real-time (Socket.IO)
Server file: `server/src/socket/socket.js`

### Socket Initialization
- Exports `initSocket(server)` and `sendMessageToSocketId(socketId, event, data)`

### Events
#### Client → Server
- `join`:
  - `{ userId, userType }` where `userType` is `"user"` or `"captain"`
  - Server updates `users.socket_id` or `captains.socket_id`.
- `update-captain-location`:
  - `{ captainId, latitude, longitude }`
  - Persists captain coordinates using `updateCaptainLocation`.

#### Server → Client (by socket id)
- `new-ride` (sent when a user creates a ride)
- `ride-confirmed` (sent when captain accepts)
- `ride-arrived` (sent when captain arrives)
- `ride-started` (sent when captain starts ride)
- `ride-completed` (sent when captain ends ride)

Client socket entry: `client/src/socket/socket.js`
- Connects to `http://localhost:7000` with `withCredentials: true`

---

## Client Routes (React Router)
File: `client/src/App.jsx`

### Public
- `/login` → `UserLogin`
- `/register` → `UserRegister`
- `/captain-login` → `CaptainLogin`
- `/captain-register` → `CaptainRegister`
- `/about` → `About`
- `/help` → placeholder `Help Page`

### User Protected
Wrapped by `UserProtectedWrapper`:
- `/` → `Home` (home/search)
- `/select-vehicle` → `VehicleSelect` (fare + vehicle options)
- `/shareOtp/:rideId` → `ShareOtp` (shows OTP/pickup code)

### Captain Protected
Wrapped by `CaptainProtectedWrapper`:
- `/captain-home` → `CaptainHome` (online + accept ride)
- `/captain-riding/:rideId` → `Arrived` (captain marks arrived)
- `/otp-verify` → `OtpVerify` (captain starts ride using OTP)
- `/end-ride` → `EndRide`

### Ride-specific
- `/request-ride` → `RequestRide` (user waiting for captain acceptance)
- `/Ride/:rideId` → `Ride` (shows ride details and route map)

---

## Frontend Functionality by Flow

### 1) User Authentication
- `UserRegister` posts to: `POST /api/v1/auth/register`
- `UserLogin` posts to: `POST /api/v1/auth/login`
- JWT is stored in `localStorage` (token) and also set as cookie by the server.

### 2) Captain Authentication
- `CaptainRegister` posts to: `POST /api/v1/auth/register` in the provided code (likely intended to be `/api/v1/captain/register`).
- `CaptainLogin` posts to: `POST /api/v1/captain/login`

### 3) Ride Booking (User)
1. **Home** (`/`): user selects pickup/destination; socket joins room: `join` with `{ userId, userType:'user' }`.
2. **VehicleSelect** (`/select-vehicle`):
   - Fetches fare: `GET /api/v1/ride/fare?pickup&destination`
   - Fetches available vehicle types: `GET /api/v1/ride/available-vehicles?pickup`
   - User selects a vehicle type and requests ride: `POST /api/v1/ride/create`
3. **RequestRide** (`/request-ride`): listens on socket for:
   - `ride-confirmed` to show captain info.
   - `ride-arrived` to navigate to `/shareOtp/:rideId`.

### 4) Captain Ride Lifecycle
1. **CaptainHome** (`/captain-home`):
   - Watches geolocation and emits `update-captain-location`.
   - Joins socket room with `{ userId: captain.id, userType:'captain' }`.
   - Listens for `new-ride` and shows accept/ignore.
2. When captain clicks **Accept**:
   - Calls `PATCH /api/v1/ride/update-status` with `status:'accepted'`.
   - Triggers server emit `ride-confirmed` to the user.
3. **Arrived** (`/captain-riding/:rideId`):
   - Calls `PATCH /api/v1/ride/update-status` with `status:'arrived'`.
   - User receives `ride-arrived` and is navigated to `/shareOtp/:rideId`.
4. **OtpVerify** (`/otp-verify`):
   - Calls `POST /api/v1/ride/start-ride` with `{ rideId, captainId, otp }`.
   - Server emits `ride-started` to the user.
   - User navigates to `/ride/:rideId`.

### 5) End Ride
- **EndRide** (`/end-ride`): UI placeholder; server supports `POST /api/v1/ride/end-ride` which emits `ride-completed`.

---

## Environment Variables (Server)
Referenced in code:
- `JWT_SECRET`
- `CORS` (server uses `cors({ origin: process.env.CORS })`)
- `NOMINATIM_USER_AGENT`
- `NOMINATIM_LANGUAGE`

Maps/geocoding uses external services:
- Nominatim (geocoding)
- OSRM (distance, duration, route)
- Photon Komoot (suggestions)

---

## Notes / Observations
- Socket server sets `io` CORS origin to `http://localhost:5173`.
- User and captain auth middleware look for JWT in cookie `token` or `Authorization` header.
- In the provided client code, some flows store tokens in `localStorage` (e.g. `token`, `Captaintoken`).
- There is a likely bug in `CaptainRegister.jsx`: it posts to `/auth/register` (user auth) instead of the captain route.


