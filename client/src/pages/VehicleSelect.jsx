import React, { useContext, useEffect, useState } from 'react'
import Map from '../components/Map'
import Navbar from '../components/Navbar'
import { useSearchParams } from 'react-router-dom'
import RideContext from '../Context/RideContext'
import axios from 'axios'
import Loader from '../components/Loader'
import { toast } from 'react-toastify'
import RideMap from '../components/RideMap'

const VehicleSelect = () => {
    const vehicles = [
        {
            id: 1,
            type: "Car",
            fareKey: "car",
            description: "Comfortable ride",
            image:
            "data:image/png;base64,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"
                },
        {
            id: 2,
            type: "Auto",
            fareKey: "auto",
            description: "Affordable option",
            image:
                "https://png.pngtree.com/png-vector/20230416/ourmid/pngtree-3-wheeler-vector-png-image_6699799.png",
        },
        {
            id: 3,
            type: "Bike",
            fareKey: "bike",
            description: "Fastest option",
            image:
                "data:image/jpeg;base64,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"
        },
    ]
    const [searchParams] = useSearchParams()

    const pickup = searchParams.get('pickup')
    const destination = searchParams.get('destination')

    const { rideData, setRideData } = useContext(RideContext)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const getFare = async () => {
            try {
                setLoading(true)
                const token = localStorage.getItem('token')
                // console.log(token)
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/ride/fare`,
                    {
                        params: {
                            pickup,
                            destination,
                        },
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                const data = response.data.data
                // console.log(response)
                // console.log(response.data.data.Price)
                setRideData(prev => ({
                    ...prev,
                    pickup,
                    destination,
                    fare: response.data.data.Price
                }))
            } catch (error) {
                toast.error(
                    error.response?.data?.message || "Something went wrong"
                )
                console.log(error.response?.data)
                console.log(error.response?.status)
                console.log(error.message)
            } finally {
                setLoading(false)
            }
        }
        if (pickup && destination) {
            getFare()
        }

    }, [pickup, destination, setRideData])

    if (loading) {
        return <Loader />
    }
    return (
        <>
        {/* <div className="text-5xl text-gray-700 font-semibold mt-4 mb-5 text-center">Choose a Mode To Travel</div>
            <div className="md:flex items-center justify-center gap-15 md:flex-row-reverse">

                <div className='border-2  border-blue-100 shadow-xl rounded-lg h-[490px] overflow-hidden  relative z-0" w-[750px]'>
                    <RideMap pickup={rideData.pickup} destination={rideData.destination} />
                </div>

                <div className="md:w-[550px] md:h-[560px] md shadow-2xs  p-4 rounded-t-3xl md:rounded-none  overflow-y-auto">

                    <h2 className="text-3xl pl-1 indent-2 flex items-center font-semibold mb-1 ">
                        <img className='h-17 w-17 ' src="data:image/png;base64,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" alt="" />   Select a Vehicle
                    </h2>  
                    <h1  className="text-2xl pl-1 font-semibold mb-2 text-gray-600"><img className='h-16 w-17 mb-1' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN6Y0wQThuzXcQuB05SPmhtRoG25NvrJvWWg&s" alt="" />Total Distance : : <span className='font-mono'> {(rideData.distance)/1000} Km</span></h1>

                    <div className="space-y-4">
                        {vehicles.map((vehicle) => (
                            <div
                                key={vehicle.id}
                                className="flex items-center gap-4 p-4 border rounded-2xl cursor-pointer hover:bg-gray-50 transition"
                            >
                                <img
                                    src={vehicle.image}
                                    alt={vehicle.type}
                                    className="h-17 w-17 object-contain"
                                />

                                <div className="flex-1">
                                    <h3 className="font-semibold text-lg">
                                        {vehicle.type}
                                    </h3>

                                    <p className="text-sm text-gray-500">
                                        {vehicle.description}
                                    </p>
                                </div>

                                <p className="text-lg font-bold">
                                    ₹{rideData.fare?.[vehicle.fareKey] || 0}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
            </div> */}
            <div className="h-screen flex flex-col">

    <div className="hidden md:block text-5xl text-gray-700 font-semibold mt-3 m text-center">
        Choose a Mode To Travel
    </div>

    <div className="flex flex-col md:flex-row-reverse md:mt-10 md:justify-center md:gap-15 flex-1">

        <div className="h-[47vh] rounded-b-2xl md:mt-7 md:h-[490px] md:w-[750px] border-2 border-blue-100 shadow-xl rounded-lg overflow-hidden relative z-0">
            <RideMap
                pickup={rideData.pickup}
                destination={rideData.destination}
            />
        </div>

        
        <div className="h-[53vh] md:h-[560px] md:w-[550px] p-4 rounded-t-4xl md:rounded-none overflow-y-auto">

            <h2 className="text-2xl md:text-3xl  indent-1.5 pl-1 flex items-center font-semibold mb-1">
                <img
                    className="h-14 w-14 md:h-17 md:w-17"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABm1BMVEX///8Azv9EREQAzf8EkJ4A0f89PDwEjZoAAAAA0v+MjY5DQ0P6+voA1P8AACI6OjqCg4Of6/985P/L9P+goKEAACH/iggCqcgAABSe6/8AABi48P+w7v8Cq8uVlpcAACXW9/8AABuM5/8zNDUEhJQAmMAAuugADis13P2ysrJdXV0APl507fkAACm17/8DdocAR1zOzs67u7sAAAtS5PsAM1EAhqt9gYoAHj3b29sDmKsDobkALkRqbnldYG3v7+8ApM3o//8AYIEvMjpLU2IYIDGNkZpwcHDi5OcAIT9b5vsAi7EAsd0ASmmytr3o+v4AaYvcWQAUGi4AdpkeJTE2QVQeLEIQHjYALUNXV1ccHTQAIEFDQE0WECsAOVsbvOAzLDpLRlFoeoiDmaWhvcnC199abHs4SVrJ3+W53uptjJuQw9VUgJWsyNN0qbyAzeVIfZM8XnOHt8lvnrJ41vFot9AAW3IrR15GLym1YRIsHyQrEhNUMSGITBrycwDCZgvLVQeUQxRwNxahRxPleww3HRtiLBEmJSUSGCMIkG+FAAAPsklEQVR4nO2aj3/SSPrHF2laEAL+SDTij8hSMlTEChRC1ABCyEKBWIEE7dqrW3evumrVra3nnbun3u65f/b3mUmgUNhVKq7e9zXv+molhcx85vk18zRffUWhUCgUCoVCoVAoFAqFQqFQKBQKhUKhUCgUCoVCoVAoFAqFQqFQKBQKhUKhUCgUCoVCoVAoFAqFQqFQ/t/iryrJlMFxnK7LGF3nOMMwkkq14P/cc/tICtWkoee1u6trCOW+rWUyf4sTMplaLZdDaNUyNVUHqf+bSpOcemct7Un8rdSuR8+uA2wMYFnW62UkSWoUi/XsSjOTSHvW7uZlLln43DOehEJKFT3fxttRULW0vHxxlOXl5aUlrDjmdTWi2VI8l05bKqf8b8gscN8FMivF9diQNkcSa+MltmR7r1wuqVEvZRKrd+TUFy+yoFuJlSLDgk8ShUQY62VcLrcLYBiX2+3qaYNXDgx8wiVF25l0SDWqn1vEn+DnLCGUWckWG0SMl2XI7Bkvg6WR8MN6ollMPVpsSBL83utlHJkuVyPbzK3mjeoXmnwULW3l85oV9oQz7agbzxubplGMZtulZqaGwnwGm7KZ5vmwkPZ40mIt3mzXixLTMyjDgsiMZ1U1vkCNflnYTNr/VQx5zVNrsIyUbfIgZO3ud/kN+d697+80WZCR0W/cOH/+/P0fHn9/b+Pvm6seT6DZLkouHJFYJCtl40Io/6W5q6IF9H6aKMgo3mCkldqapn//+If79++fx1y/u8K6GKl27/qNG0QkcPz4g8ff/7hZQTVQ6SauCt/cjXY8cFf9khIPJ1rJ/ouFilhnpXZodeOHG9evX+9JOX5cyILCRs4YuOTw4OG9Z11PrhSV7Oj1sq5iO+NZk40vQ2RBFuTqVzfsF4oaLknuLKro928MS3ngiYLCIno8ePF0j0tnHj560UXNusTY7grFsp1B1pdQQqqmcO+Gw3VuNRxlinHPxg/XB+2ENTz0FCHDRlsPhq4CZ3ocffLU8qBS1M32Ek9xBXnu6Mn3T+JTwoVMogbkXX/8nWfFJZU82uPr+6x06czpLVFiXGx29cHQ5Z44zCngyfYzT7hUdLN2DWGZxgpkV/nzbewKcuCZnUiAe3ym6IrmWveG5V26RIRs16D+sSvWvssD6k6d+hqz89RCzajbKZRel1Qs5dB3+ucpk8nN9D1by/nzj01PGxvw744bDlrpKMh41MQlsmQ61y/tqTvaF+fwfOuFp1aHesqQzZCXlaKlhKBxyl+tr8Dx5sPjp+088iMfxwa0tgfU7ak4derosxIYhc08Oz5svVPD8o457Dzjmw02xvY2doxUL6HVv7hMKnnP0wdOtnhoptsubym9+WA4f+x54HOzjRXWNgZ/c3SsOkejhRre5aXe7tUFIYk3PHLqr9KXVD0vfurNdsPTbMSKNbRN9J25NGwhIuJJqw5lwB368fTIr8bIO3bs+fOdtZI7dnFPIt7wYJFI//Te6i8YKrK2jzrsmKjtcmXRi4f97DhqoSdC0QtbGs/WGN88dmxP4PMnO1uPnj57YVYQirpiFy/G3K4BkYy7WEJddeoFxF8gDRcDt1y4c3IeJV5sf33KscKjdLwRk5qejTOne1llWILtdB4oFkzD89NI6H2N7bWzs411WWuCxyOgTHMF78lZsOGgEbFE1/qVXcSH5ekpSxq6qt1dJQ2XXO7bWq2WqQWEF9tPntvT23mBsi5vEVk/jXrmoPdtp+G84S2Gnzi/fP78yRNHlml14ea1TLxZwsIakhtvUfEmlYVjJjtgQ8a9PrOYQf94+VKYRjj6Fdxvgb1/Da8oHOgauOWyLkGBWql5BOvZU+BZutbwerOhzYd7WWVcbF18KuIZR9e2dra3nxJZa3CE8oS7mWapne0dF+1eDmhxu91MbAksOCRQurp4LfHPlydOnPjXRxuxauRDnkS8VG/ghssSHNf7B3bYM8IZJwqnvngmXorCy3ro0ekzju36CnGysA1FNFlxyPxM2yOEUY0Yi6jqnfnJMdkWRu4fiy0tX1xeiuGuwKC+Gv8K6ztx4ufNj9rl+A3VSpB+y5LdjYiRhop7cDntlcZ7Dph3a3tra2sHvra2tre3Hz0CIwEvwFDYAW0XbOPa1gBPwMYiJc5W5e7fkcX9D7ycy8v2ag4OCG9cvAb+ecLmpfURlbHAmZ5Mez1GmklYHeMeHmoEKR4KCTbpEC+iGo4pbKc2blcQB3T3jgxett+Fitlg98CqcMOKdKy8uKEzMiQj8fybm784Cv+NDpxO/YaZaBbZJSIP7yneo85FDgHSIM7sGGavpcY6u0wSaT1pDmyMBJ/9hjHSenjruVevHYm/vOaNgwpU05kiQ/SBvPerI8SIG7Mgye4T9i1jNxG9zNC73WP4oGG8UfG31zexxl9u3vz9gKkmaSWyxH7Lsf3j2q/Hzya2PNrxhcidYPYfBNuIg6PavNIOKLDWILONMfvkuRjHLBCWrpFJQ2aP9Rr3jJPsD66MfHbsDRipFPjtzWus8G3uIAKVtbhk/4lhRMCS3eF1XI8Z1TiJu/25PAbXCpxMxywl4402eeG/IPI/4QOUi4KWkUiHMxqVhu4LZl0aUA1TYJn9Y08Ht8uOEWcxY96Rd3hJ47j19o3ATa5QDjdL8W8TYiDA1xp9CW7IO0uskwVJP5405z+NQC/expDs2h9sBNw4XkmEeGvSI0ZBFVq/vf355cvXr1+/Qn2FbjijgVPi/l7zWq12rZQtutjRYadDjGRwKboSv3XrVrMUlZjxvsKwVy+j8KS5Rg+//PVXKDU3b4LA7J5A2DrBjrfehA19q1JphXnUrLs+iZOCsyyDvpVMgEetVgvxgVsrjfEaGWlmNzBh0a/Wfial9Obrt3ytOCAQtr7eYlwIl4O+Q4BvthwWmsVP4aUQDV53G4Ur5Vk8lC9YboVRSRo/1NWZXX6ykmjw/yYC3/wz1x64KU6bTBvxZSLPxlcOo/bUrUjO81KTrwQHR0J8pj7u3UxjZuayOVH7jfvXr1jgWyFeHHAMIrUtVGYPDRFpCdkpS3SzkM+gopeHRwp2xO78uKCQZmYWQxPlGvkf2ENf8dn9eYRtCx3bPYPlcmTWtmWwIrSn7KhLy16pxgfJSLPBSNAZyddBaF4aI3FmZl6YaG+qvoIU81utvn/eTBG17KDotAI4Bdj+Gmyh4jStCCaMuUrhMtYXKXcQlKxWx+dY8fKVMZ+YmZlL6BMI9Of/e/M/oUxxfyFgpAwPLgqjBkRN5zg93yWO5IuE41MUCFG45K0TgcFIhbfyuq7nLXukYEXcPTnyAfDSudwkqcavvXoTKI16g7ctwDDBSEfUuKSS1M1NXQ1gr50th+pTrItuyNmZFl65CLLkpKIYeU1WUcWHL4Gfru+bGbM+BwonsuFmON0eE9FSvOUjFsyr5jlFFkykKipeW1+k1ZyeQFDojQbgtpFIy5I1WTG6qNtVdLKYwQq/e3X/B67OTeqlJoqOMQkb5cmwYt4IWQkdqXKYU0DiLI6PaUaim3U1yVpWEobW5XXN0q1NRdHFMg4R/trc+uC7GffJOZxpJmm4+c3SuNzIroAYX6STMLiA3AUDWpscl0x2O9hNA+0puikjIXst1aSlbppdTevqRkrREHGX3PzZwTc3rs4Au+IkvRr/nZVx02UzZGFbmmIIqoabSlZAQLqKsO5WnP2DfeMB8BaFCF7LrpE0tQ2EuqLVDSVkLhEkK7x4BTdH1qX19bMnr8zMYYFztfwEAiGXlsZt412ogvNMQFeUfNdC+J+qm92NFh63krtyEjeZpnCKZxi2LszitdxMgmuaEIRdtCnnRdXEli0Hdmcc5ubm7J+LmQn3pWrTTR7u2QN3hyQRKywjzpBVCyFdB4mmJW50y3hlEYx35crVqyfPOpychLMDrK+vtwPYW8J5RZc1BJnbRJa5GchrHTwBsa/QZn73mmBN2IvSb83gyfa5QphJEIUtuQvmQ5bOWcjKq7qBHIX9ZZ37WOCsgBWifD7cBR+VUxATm5pqYIVgw2bfhvOLu5cTwpo6ca/NQPMz+5mbmQ9UcE6BDGPqshWwLPAeTVE4FMRpLzD6kYOzK/pwbGuaJctmwDKxt6SUpNmBq+VAbRFrA3G3UGLVVA/yaFi1e23RZh6ARcWzn78cbuFxUV5HvNjtigiZqsApMiL5J3xtihIXRRLbJodEqIUoAIVfVJUFcrXTtcK5REjgLU3mDvzgm2Faq5ArExhEWvG5GngLWOsQ+GMqBdsolEcmkrty0iKug9RubXdxgPk/Zp9LjmE+gUtfWdSTsqx2TbChqpmKSny3la9ysm4kq/6PelyhoCjJZDKF/0y4wOnkyWxdqVpk3EBeUVJiXg7ryBR12S6SKJnUcCM/LYTwNwF+hMI8HwiIiT5kpWCtbt26dW2Py/vZhS+c1MBNu4qiQC2EomiZmoErbyQy4Vl3MvAiHprtBFRFD2uiluQsbUMkW9WW5scPdGMUDCxP0hiEI4+w48XqQR5nl9U+eYKGuaNp2F18ZV5LppBmigvgVLJJynFH+JR/107iDT+RyJlWHm+JVdTBsVkOHaCdZ+MfpmBTtSpkRy9qsG8zoQKnZJPESASZ01Q0gsr7yMA81HqwC2RUOCHCGQdN1kP4ALgQOf+WAygvGynjXF5skYMbZIEpjzSMQpYWm7FFElAHdzTgENed/tMCeUS6JbPlFt7TBMhhG841nzQKMUai4/SFZsvlIJkDnBcD+VRqwYbrcc7h8Htx3tj/pH2jw2LFaV0Ey2W7tzeLfXQ6jwlBNJCMAdkUz/ncuSNHjnzzzTcXLty+XRaHO1H4GI7KvuAIs5Oy//MR1BoeCSxImiiHbt++cAGmc+TIYViWhVQKspqiVKuFDygf/qqSWuAOgxrQchtu6rOHJjPwEQ6Ve92Z3qgttK8lNi2CrdbAncGAHazZ5zC7NzWYFai+DapB80IqWf3Dv9MUjgTfvYtEIr3P2ZJGBq6AxiAZBHekUCvyaQTC+uGRcJvNBz6Ch+qMfdee5GAwEnn37l3wwh9K9FeTKQ5ckvjjbdLKg485XtS7EyS4CkKtCgDpplIeXYPpESQjdTodPFQnuCdnwIjBWZ9tRHDdI0fOcQt/YsP9cYg3NTgMD5MwxKoP2Q3M4Lvfw/hRhPDv7yKwbNjqHx2Go5GIicBIIbJF6jjjOGq+IYEo9wIRkka18CGB+H56NdnZt+BFwAxmUpwXSQodzKNHxjAupw5k0wX71mQUxZZQmJKKaeKHL/xtHOT6V1/ajCkUCoVCoVAoFAqFQqFQKBQKhUKhUCgUCoVCoVAoFAqFQqFQKBQKhUKhUCgUCoVCoVAoFAqFQqFQKBQKhUKhUL4Y/g/AJbnyhSX/agAAAABJRU5ErkJggg=="
                    alt=""
                />
                Select a Vehicle
            </h2>

            <div className="flex items-center gap-2 mb-3">
                <img
                    className="h-10 w-10 md:h-16 md:w-17"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN6Y0wQThuzXcQuB05SPmhtRoG25NvrJvWWg&s"
                    alt=""
                />

                <h1 className="text-lg md:text-2xl font-semibold text-gray-600 ">
                    Total Distance :
                    <span className="font-mono">
                        {" "}
                        {(rideData.distance / 1000).toFixed(1)} Km
                    </span>
                </h1>
            </div>

            <div className="space-y-3 md:space-y-4  ">
                {vehicles.map((vehicle) => (
                    <div
                        key={vehicle.id}
                        className="flex mt-5 items-center gap-3 md:gap-4 p-3 md:p-4 border rounded-2xl cursor-pointer hover:bg-gray-50 transition"
                    >
                        <img
                            src={vehicle.image}
                            alt={vehicle.type}
                            className="h-14 w-14 md:h-17 md:w-17 object-contain"
                        />

                        <div className="flex-1">
                            <h3 className="font-semibold text-base md:text-lg">
                                {vehicle.type}
                            </h3>

                            <p className="text-xs md:text-sm text-gray-500">
                                {vehicle.description}
                            </p>
                        </div>

                        <p className="text-base md:text-lg font-bold">
                            ₹{rideData.fare?.[vehicle.fareKey] || 0}
                        </p>
                    </div>
                ))}
            </div>

        </div>
    </div>
</div>
        </>
    )
}

export default VehicleSelect