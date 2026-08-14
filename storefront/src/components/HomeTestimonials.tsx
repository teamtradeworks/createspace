const testimonials = [
  {
    quote:
      "There are not many companies left that go out of their way to ensure a satisfied customer, this is one of them.",
    author: "Charl Jordan",
    role: "Parent of 9-year-old son",
  },
  {
    quote:
      "Our homeschool group have loved working with their Makerzoid kits this term. They have found the builds to be challenging and interesting and have been able to apply creativity in adding on their own ideas.",
    author: "Michelle Edwards",
    role: "Educational Psychologist, Durban",
  },
  {
    quote:
      "We purchased just over 100 robotics kits last year, and the quality has been excellent. Our school clients really loved them—they’ve been engaging, reliable, and a great addition to the learning experience.",
    author: "Zami Mokhali",
    role: "Founder, JustMi-Kid",
  },
];

export default function HomeTestimonials() {
  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-xl">
          <h2 className="text-3xl md:text-4xl font-semibold text-navy mb-3">
            What parents and educators say
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.author}
              className="bg-white rounded-2xl p-6 md:p-8 flex flex-col"
            >
              <div className="flex gap-1 mb-4" aria-label="5 out of 5 stars">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-cs-yellow"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-gray-700 leading-relaxed mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-auto">
                <p className="font-semibold text-navy">{testimonial.author}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
