import { notFound } from "next/navigation";
import { getProductByHandle } from "@/lib/shopify";
import { resolveAddonsForHandle, serializeAddons } from "@/lib/product-addons";
import ProductJsonLd from "@/components/ProductJsonLd";
import {
  HeroSection,
  QuickInfoBadges,
  NumberedSteps,
  FeatureGrid,
  ImageTextBlock,
  ProjectShowcase,
  CustomerShowcase,
  ProductReviews,
  ProductFAQ,
  WhatsIncluded,
  Specifications,
  CallToAction,
  ProductTrackingProvider,
} from "@/components/product-sections";

const PRODUCT_HANDLE = "arduino-sensor-kit-base";

export default async function ArduinoSensorKitBasePage() {
  const product = await getProductByHandle(PRODUCT_HANDLE);

  if (!product) {
    notFound();
  }

  const resolvedAddons = await resolveAddonsForHandle(PRODUCT_HANDLE);
  const addons = serializeAddons(resolvedAddons);

  return (
    <ProductTrackingProvider handle={PRODUCT_HANDLE}>
      <ProductJsonLd product={product} />

      {/* Hero Section */}
        <HeroSection
        product={product}
        tagline="Plug in a sensor. Write your first real code. Watch it come alive."
        highlights={[
          "10 plug-and-play sensor modules — no soldering, no wiring chaos",
          "10 guided online lessons with step-by-step instructions",
          "Learn real C++ programming with the free Arduino IDE",
          "No prior experience needed — just curiosity and a computer",
        ]}
        addons={addons}
      />

      {/* Quick Info Badges */}
        <QuickInfoBadges product={product} />

      {/* Why This Kit */}
        <NumberedSteps
        title="Why the Arduino Sensor Kit?"
        subtitle="Arduino is the world's most popular platform for learning electronics and coding. This kit makes it easier than ever to start — no breadboard, no wiring diagrams, no confusion."
        steps={[
          {
            title: "Real Code, Real Results",
            description:
              "Your child doesn't click blocks — they write actual C++ code in the same IDE used by engineers worldwide. Every line translates directly into something physical: a light blinks, a buzzer sounds, a screen shows temperature.",
          },
          {
            title: "10 Sensors, 10 Lessons",
            description:
              "Each of the 10 modules has its own dedicated lesson on the official Arduino Sensor Kit platform. One sensor, one new concept — clear, satisfying, and progressive from the very first plug-in.",
          },
          {
            title: "No Dead Ends",
            description:
              "After the 10 lessons, the learning doesn't stop. Mix and match modules to dream up custom projects, and tap into one of the world's largest maker communities. This kit grows with your child.",
          },
        ]}
        background="navy-card"
      />

      {/* Setup Image + Text */}
        <ImageTextBlock
        image="/images/products/arduino-sensor-kit-base/setup-connect-modules-plug-in-the-modules.png"
        imageAlt="Grove modules being connected to the Arduino Base Shield"
        title="Plug In, Sketch Up, Watch It Happen"
        body="The Grove system makes electronics feel like LEGO. Each of the 10 modules has a universal 4-pin connector that clicks into the Base Shield in seconds — no wiring diagrams, no loose jumper wires, no breadboard. Your child picks a module, follows the online lesson, writes a short sketch in the Arduino IDE, and uploads it to the board. Within minutes, something in the real world reacts to their code. That immediate feedback is what makes this kit so powerful for learners."
        layout="image-left"
        background="white"
      />

      {/* Feature Grid */}
        <FeatureGrid
        title="What Makes This Kit Different"
        subtitle="The Sensor Kit Base was designed by Arduino themselves to remove every barrier between a beginner and their first working project."
        features={[
          {
            icon: "puzzle",
            title: "Plug-and-Play Grove System",
            description:
              "All 10 modules use universal Grove connectors. Plug in, no wiring diagrams, no soldering, no loose wires.",
          },
          {
            icon: "book",
            title: "10 Guided Online Lessons",
            description:
              "Each module has its own lesson on the official Arduino platform — with introduction, plug, sketch, play, and understand steps.",
          },
          {
            icon: "code",
            title: "Real C++ Programming",
            description:
              "Write actual code in the free Arduino IDE — the same tool used by engineers and makers worldwide.",
          },
          {
            icon: "shield",
            title: "Official Arduino Product",
            description:
              "Made by Arduino, the globally trusted open-source electronics brand. High-quality hardware with ongoing platform support.",
          },
          {
            icon: "lightbulb",
            title: "10 Genuinely Different Sensors",
            description:
              "Each module introduces a completely different concept — from analog input to I2C communication to display output.",
          },
          {
            icon: "globe",
            title: "Unlimited Expansion",
            description:
              "Combine modules for custom projects. Compatible with the entire Grove ecosystem — hundreds of additional sensors available.",
          },
        ]}
        columns={3}
        background="gray"
      />

      {/* Modules Image + Text */}
        <ImageTextBlock
        image="/images/products/arduino-sensor-kit-base/the-modules-new.png"
        imageAlt="The 10 Grove sensor modules included in the Arduino Sensor Kit Base"
        title="Not Just 10 Sensors — 10 Concepts"
        body="Most beginner kits give you a handful of LEDs and a button. This one gives your child a complete tour of how electronics actually work. They'll read light levels with a photoresistor, detect sound with a microphone, measure atmospheric pressure with an I2C sensor, and display live data on an OLED screen. Each module is a different world. And because they're learning on the same platform used by professionals, every skill has a real-world counterpart."
        layout="image-right"
        background="white"
      />

      {/* Project Showcase */}
        <ProjectShowcase
        title="Modules & Lessons"
        highlight="10 plug-and-play modules, 10 guided lessons — plus unlimited ways to combine them"
        subtitle="Each module introduces a completely different concept. Here are six of the ten included — from beginner output to advanced sensing."
        projects={[
          {
            name: "The LED",
            description: "Turn it on, off, or dim it to any brightness level",
            concepts: "Digital output, PWM, analogWrite()",
            image:
              "/images/products/arduino-sensor-kit-base/projects/the-led.png",
          },
          {
            name: "The Buzzer",
            description: "Produce tones, melodies, and triggered sound alerts",
            concepts: "tone() function, frequency, digital output",
            image:
              "/images/products/arduino-sensor-kit-base/projects/the-buzzer.png",
          },
          {
            name: "The Sound Sensor",
            description: "Detect noise levels and trigger outputs above a threshold",
            concepts: "Analog input, threshold logic, reactive systems",
            image:
              "/images/products/arduino-sensor-kit-base/projects/the-sound-sensor.png",
          },
          {
            name: "The Temperature Sensor",
            description: "Read temperature and humidity simultaneously",
            concepts: "Sensor libraries, multi-value output, environment monitoring",
            image:
              "/images/products/arduino-sensor-kit-base/projects/the-temperature-sensor.png",
          },
          {
            name: "The Accelerometer",
            description: "Detect orientation, tilt, and movement in three axes",
            concepts: "Tri-axial data (X/Y/Z), motion detection, library APIs",
            image:
              "/images/products/arduino-sensor-kit-base/projects/the-accelerometer-sensor.png",
          },
          {
            name: "The OLED Screen",
            description: "Display text, values, and live sensor data on screen",
            concepts: "I2C display control, string formatting, combining modules",
            image:
              "/images/products/arduino-sensor-kit-base/projects/the-oled-screen.png",
          },
        ]}
        moreText="Plus 4 more: Button, Potentiometer, Light Sensor, and Air Pressure Sensor — each with its own guided lesson and project ideas"
        background="gray"
      />

      {/* Customer Showcase */}
        <CustomerShowcase
        title="See It in Action"
        subtitle="Real builds from makers who started exactly where your child is now."
        images={[
          {
            src: "/images/products/arduino-sensor-kit-base/kids-smiling-holding-sensor-base.jpg",
            alt: "Kids smiling while holding the Arduino Sensor Kit Base board",
          },
          {
            src: "/images/products/arduino-sensor-kit-base/pressing-button-with-oled-screen-on.png",
            alt: "Pressing the button module with the OLED screen displaying output",
          },
          {
            src: "/images/products/arduino-sensor-kit-base/grove-connectors-attached-to-base-board.jpg",
            alt: "Grove connector cables attached to the Base Shield",
          },
          {
            src: "/images/products/arduino-sensor-kit-base/oled-diplay-screen-on.png",
            alt: "OLED display module showing live data output",
          },
          {
            src: "/images/products/arduino-sensor-kit-base/arduino-camp-kids-in-class.jpg",
            alt: "Kids working with Arduino kits in a classroom setting",
          },
          {
            src: "/images/products/arduino-sensor-kit-base/hands-holding-base.jpg",
            alt: "Hands holding the Arduino Base Shield",
          },
          {
            src: "/images/products/arduino-sensor-kit-base/base-displayed-with-connectors-around-it.jpg",
            alt: "Base Shield displayed with Grove connector modules arranged around it",
          },
          {
            src: "/images/products/arduino-sensor-kit-base/seperating-the-pieces.jpg",
            alt: "Separating and organising the Grove modules from the kit",
          },
        ]}
        background="white"
      />

      {/* Reviews */}
        <ProductReviews productId={product.id} background="gray" />

      {/* FAQ */}
        <ProductFAQ
        title="Common Questions"
        faqs={[
          {
            question: "Do I need any prior experience with electronics or coding?",
            answer:
              "Not at all. The kit is designed for complete beginners. The lessons on the official Arduino platform start from the very basics — explaining what each component does before asking your child to write a single line of code. Most learners have their first module working within 30 minutes.",
          },
          {
            question: "What age is this suitable for?",
            answer:
              "We recommend this kit for ages 12 and up, as it uses real text-based C++ programming in the Arduino IDE. Motivated learners aged 10–11 can absolutely work through it — especially with a parent nearby for the initial setup. It's also excellent for teenagers and adults who want to move beyond beginner block coding.",
          },
          {
            question: "Do we need to buy an Arduino UNO board separately?",
            answer:
              "Yes — the Arduino UNO board is not included in the Sensor Kit Base. The Base Shield plugs on top of an Arduino UNO to connect the Grove modules. If you don't already own one, the Arduino Sensor Kit Bundle includes both the base kit and the UNO board together, which is usually the best value.",
          },
          {
            question: "What software does my child need?",
            answer:
              "The Arduino IDE is a free download for Windows, Mac, and Linux. It's straightforward to install and Arduino's website has clear setup guides. The lesson platform at sensorkit.arduino.cc is browser-based — no additional software needed for the tutorials.",
          },
          {
            question: "Is soldering required?",
            answer:
              "No. Every connection is made using the Grove plug-and-play system — just click the cable in. There are no loose wires, no breadboard, and no soldering iron needed. This is one of the things that makes the Sensor Kit genuinely beginner-friendly.",
          },
          {
            question: "What can my child do once they've completed all 10 lessons?",
            answer:
              "That's where it gets exciting. The 10 lessons are just the foundation. Once your child understands each module, they can combine them in any configuration to build custom projects — a smart light alarm, a weather station, a motion detector. The Arduino community also has thousands of free tutorials and project ideas to explore, and the Grove system is compatible with hundreds of additional sensors to expand the kit further.",
          },
        ]}
        background="white"
      />

      {/* What's in the Box */}
        <WhatsIncluded
        title="What's in the Box"
        image="/images/products/arduino-sensor-kit-base/whats-in-the-box.jpeg"
        imageAlt="Arduino Sensor Kit Base unboxed showing all 10 Grove modules and cables"
        items={[
          "Base Shield (fits on Arduino UNO, 16 Grove connectors)",
          "LED module",
          "Button module",
          "Potentiometer module",
          "Buzzer module",
          "Light Sensor module",
          "Sound Sensor module",
          "Air Pressure Sensor module",
          "Temperature & Humidity Sensor module",
          "Accelerometer module",
          "OLED Screen module",
          "6 Grove cables",
          "Access to 10 online lessons at sensorkit.arduino.cc",
        ]}
        background="gray"
      />

      {/* Specifications */}
        <Specifications
        title="Technical Details"
        specs={[
          { label: "Product Code", value: "TPX00031" },
          { label: "Compatible Board", value: "Arduino UNO (not included)" },
          { label: "No. of Modules", value: "10" },
          { label: "No. of Grove Cables", value: "6" },
          {
            label: "Grove Connections (Base Shield)",
            value: "16 (7 digital, 4 analog, 4 I2C, 1 UART)",
          },
          { label: "Soldering Required", value: "No" },
          { label: "Coding Language", value: "C++ (Arduino IDE)" },
          { label: "Arduino IDE", value: "Free download — Windows, Mac, Linux" },
          { label: "Online Lessons", value: "10 (sensorkit.arduino.cc)" },
          { label: "Collaboration", value: "Developed with Seeed Studio" },
        ]}
        background="white"
      />

      {/* Final CTA */}
        <CallToAction
        title="Get Started"
        subtitle="Your child's first steps into real electronics and coding — 10 sensors, 10 lessons, and a world of projects to explore."
        primaryLabel="Add to Cart"
        primaryHref="#product-actions"
        secondaryLabel="Browse More Kits"
        secondaryHref="/shop"
        background="navy"
      />
    </ProductTrackingProvider>
  );
}

export async function generateMetadata() {
  const product = await getProductByHandle(PRODUCT_HANDLE);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: `${product.title} | CREATESPACE`,
    description:
      "Learn real electronics and C++ coding with 10 plug-and-play Grove sensors. 10 guided lessons, no soldering required. Perfect for beginners aged 12+.",
    alternates: {
      canonical: "/product/arduino-sensor-kit-base",
    },
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}
