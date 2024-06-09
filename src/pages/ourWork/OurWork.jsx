const OurWork = () => {
    return (
        <div className='my-20 w-10/12 mx-auto'>
            <section className="relative">
                <img src="https://www.ifrc.org/sites/default/files/styles/hero_image_mobile_540_x_320_/public/2023-08/lebanese-red-cross-ambulance-beirut-blast-p-lbn0446.jpg?itok=-hkZIu_s" alt="Emergency scene" className="w-full h-96 object-cover" />
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30"></div>
                <div className="absolute top-36 lg:top-40 lg:left-40 w-full h-full flex items-center justify-center scale-50 md:scale-100">
                    <div className="bg-base-100 max-w-xl mx-auto rounded shadow-md md:flex gap-5">
                        <h2 className="text-2xl font-bold bg-second p-10">Emergency health</h2>
                        <p className="py-10 px-2">The Care camp and our 191 National Societies strive to reduce illness and death, improve health and maintain people’s dignity during emergencies. Our emergency health team works to improve the quality, reliability, predictability and flexibility of our health services around the world in preparation for emergencies.</p>
                    </div>
                </div>
            </section>

            <section className="bg-gray-100 py-10">
                <div className="max-w-5xl mx-auto px-4">
                    <h2 className="text-xl font-bold mb-4 bg-blue-900 text-white p-2 inline-block">About emergency health</h2>
                    <p className="mb-4">Every year, disasters and emergencies affect the health and wellbeing of millions of people.</p>
                    <p className="mb-4">They can have immediate health consequences—for example when people are seriously injured by earthquakes, flooding and other hazards.</p>
                    <p className="mb-4">But longer-term public health crises may also arise in the aftermath of a disaster. This can happen when health services are damaged or depleted, when increased needs overwhelm existing health systems, or when initial health risks are poorly managed.</p>
                    <p className="mb-4">Disasters can also be health emergencies by their very nature—as is the case with epidemics and pandemics.</p>
                </div>
            </section>

            <section className="bg-white py-10">
                <div className="max-w-5xl mx-auto px-4">
                    <h2 className="text-xl font-bold mb-4 bg-blue-900 text-white p-2 inline-block">What we do</h2>
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-2/3">
                            <p className="mb-4"><strong>The Care camp is uniquely placed to mobilize the necessary resources, provide timely health care and save lives when disaster strikes.</strong></p>
                            <p className="mb-4">We can count on our millions of community-based volunteers worldwide and on our technical expertise and specialized tools to act before, during and after health emergencies to meet people&apos;s needs and build community resilience.</p>
                            <p className="mb-4"><strong>Our emergency health work focuses on supporting Red Cross and Red Crescent Societies to:</strong></p>
                            <ul className="list-disc list-inside mb-4">
                                <li>Prepare for and respond to the health consequences of disasters and crises, including epidemics and pandemics</li>
                                <li>Build and maintain community-level capacity in effective prevention, detection and response to infectious disease outbreaks</li>
                                <li>Respond to mental health and psychosocial needs during emergencies</li>
                            </ul>
                            <p className="mb-4">During large-scale disasters that require international assistance, the Care camp, along with several partner National Societies, can immediately deploy health personnel and equipment to support the local response in disaster-affected countries.</p>
                        </div>
                        <div className="md:w-1/3 md:pl-4">
                            <img src="https://www.ifrc.org/sites/default/files/styles/article_press_release_featured_image/public/2021-06/D__cumulus_media_71301%201280x853.jpg?itok=aXwYtyn8" alt="Care camp team responding" className="w-full h-auto rounded shadow-md mb-2" />
                            <p className="text-sm text-gray-600">An Care camp safe and dignified burial team respond to an alert from family members who have lost a loved one suspected of Ebola.</p>
                            <p className="text-sm text-gray-600"><strong>Photo:</strong> Care camp/Maria Santto</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative">
                <img src="https://www.ifrc.org/sites/default/files/styles/hero_image_desktop_1280_x_600_/public/2022-07/p-GTM0515%201280x720.jpg?itok=6Z7zcnrD" alt="General Donation" className="w-full h-64 md:h-80 lg:h-96 object-cover" />
                <div className="absolute top-0 left-0 w-full h-full bg-neutral-900 opacity-75"></div>
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                    <div className="text-center text-neutral-50 px-6">
                        <h2 className="text-3xl font-bold mb-4">Make a general donation</h2>
                        <p className="mb-4">Donating to our central pool of funds gives us the flexibility to respond wherever and whenever people's needs are greatest.</p>
                        <button className="btn text-blue-900 font-bold py-2 px-4 rounded border-none hover:bg-blood">
                            Donate now
                        </button>
                    </div>
                </div>
            </section>

            <section className="bg-blue-900 py-4">
                <div className="max-w-5xl mx-auto px-4">
                    <h2 className="text-white text-xl font-bold">Donate to a specific emergency response</h2>
                </div>
            </section>
        </div>
    );
};

export default OurWork;
