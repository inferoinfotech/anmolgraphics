import React from "react";

const testimonials = [

    {
        name: "Sultan",
        role: " Manager",
        image: "https://profile.justdial.com/profileImg?i=V8A%2BC%2Be3mfEqGwJisV4GcsPNo36SbmXXuDVEbr8jCOU%3D",
        text: "We are from Nagpur and got a reference to Anmol Graphics through a common friend. From the very first interaction, their response was positive and professional. Unlike most ID card makers who take too long, they got the job done in no time! The quality of work was excellent, and the pricing was very reasonable. Highly recommended!",
        rating: 5,
    },
    {
        name: "Amit Mandviwala",
        role: "Director",
        image: "https://profile.justdial.com/profileImg?i=3awyTR%2FLktSzOFhjYFu82IchIXJJ25UfsmpCXqFJvbo%3D",
        text: "I am very impressed with their work. We have rejected so many vendor for different issue. They provide perfect ID Crad which we are looking for in one go. Must say quality work in reasonable pricing",
        rating: 5,
    },
    {
        name: "Ketan Chauhan",
        role: "Director",
        image: "https://profile.justdial.com/profileImg?i=jbzn6WRcgoXHl5r8kvEx2xLhY0sFxAe%2BlQBpNbPxspc%3D",
        text: "Anmol Graphics exceeded our expectations with their outstanding service. The team was highly responsive, and the ID cards were delivered with exceptional quality and precision. Their professionalism and reasonable pricing make them a top choice. Highly recommended!",
        rating: 5,
    },
];

const Testimonial = () => {
    return (
        <section className="py-12 bg-gradient-to-b from-gray-50 to-white sm:py-16 lg:py-20">
            <div className="px-4 mx-auto max-w-[1440px] sm:px-6 lg:px-8 text-center">
                <div className="my-5 text-2xl font-bold leading-tight text-gray-900 sm:leading-tight sm:text-5xl lg:text-6xl lg:leading-tight font-pj">
                    Our happy clients say about us
                </div>
                <p className="text-center text-lg font-medium text-gray-600">1,558 satisfied customers across 14 states trust Anmol Graphics for top-notch printing solutions!</p>

                <div className="relative mt-10 md:mt-24">
                    <div className="absolute -inset-x-1 inset-y-16 md:-inset-x-2 md:-inset-y-6 opacity-30 blur-lg">
                        <div
                            className="w-full h-full max-w-5xl mx-auto rounded-3xl"
                            style={{
                                background: "linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)",
                            }}
                        />
                    </div>
                    <div className="relative grid grid-cols-1 gap-6 mx-auto sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="group relative flex flex-col overflow-hidden shadow-xl bg-white p-6 lg:py-8 lg:px-7 rounded-lg transform transition-all duration-500 ease-in-out hover:rotate-0"
                                style={{
                                    transform: `rotate(${index % 2 === 0 ? "-2" : "2"}deg)`,
                                }}
                            >
                                <div className="flex-1">
                                    <div className="flex items-center">
                                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                                            <svg
                                                key={i}
                                                className="w-4 h-4 sm:w-5 sm:h-5 text-[#FDB241]"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <blockquote className="flex-1 mt-4 sm:mt-6">
                                        <p className="text-sm sm:text-lg leading-relaxed text-gray-900">{testimonial.text}</p>
                                    </blockquote>
                                </div>

                                <div className="flex items-center justify-between mt-4 sm:mt-6">
                                    <div className="flex items-center">
                                        <img
                                            className="flex-shrink-0 object-cover rounded-full w-8 h-8 sm:w-10 sm:h-10"
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                        />
                                        <div className="ml-3">
                                            <p className="text-sm sm:text-base font-bold text-gray-900">{testimonial.name}</p>
                                            <p className="mt-0.5 text-xs sm:text-sm text-gray-600">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonial;