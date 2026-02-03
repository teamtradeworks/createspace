# Product Page Components

This document specifies all reusable components for product pages. Components are located in `storefront/src/components/product-sections/`.

**Kitchen Sink Preview:** View all components at `/product/kitchen-sink`

---

## QuickInfoBadges

Displays key product information at a glance using icon badges.

**Props:**
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `age` | `string` | No | - | Age range (e.g., "10+", "8-12") |
| `skill` | `"beginner" \| "intermediate" \| "advanced"` | No | - | Skill level with color coding |
| `supervision` | `boolean` | No | - | Whether adult supervision is required |
| `batteries` | `string` | No | - | Battery requirements |
| `badges` | `BadgeConfig[]` | No | `[]` | Custom badges |

**BadgeConfig:**
```ts
{ icon: IconName; label: string; value: string }
```

**Available Icons:** `age`, `skill`, `supervision`, `battery`, `time`, `projects`, `no-soldering`, `guide`, `no-tools`, `app`, `scratch`, `tag`

**Example:**
```tsx
<QuickInfoBadges
  age="10+"
  skill="beginner"
  supervision={false}
  batteries="4x AA (not included)"
  badges={[
    { icon: "time", label: "Build Time", value: "2-3 hours" },
    { icon: "projects", label: "Projects", value: "15+" },
  ]}
/>
```

---

## SkillTags

Displays STEM and life skill tags with color-coded styling.

**Props:**
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `tags` | `string[]` | Yes | - | Array of skill tag names |
| `title` | `string` | No | `"Skills"` | Label before tags |
| `background` | `"white" \| "gray" \| "navy"` | No | `"white"` | Background color |

**Pre-defined Tag Colors:**
- **STEM Skills:** Circuits (blue), Coding (purple), Robotics (orange), Mechanical Engineering (green), Electronics (blue), Science (purple), Mathematics (orange)
- **Life Skills:** Problem Solving (navy), Logical Thinking (navy), Creativity (yellow), Following Instructions (gray), Fine Motor Skills (gray), Patience & Focus (gray)

**Example:**
```tsx
<SkillTags
  title="Skills Developed"
  tags={["Circuits", "Coding", "Problem Solving", "Creativity"]}
/>
```

---

## ImageTextBlock

Split section with image and text content.

**Props:**
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `image` | `string` | Yes | - | Image path |
| `imageAlt` | `string` | No | `""` | Alt text for image |
| `title` | `string` | Yes | - | Section heading |
| `body` | `string \| React.ReactNode` | Yes | - | Text content (string or JSX) |
| `layout` | `"image-left" \| "image-right"` | No | `"image-left"` | Image position |
| `background` | `"white" \| "gray" \| "navy"` | No | `"white"` | Background color |

**Image Guidelines:**
- **Only use lifestyle images** - these are high-resolution, professional quality photos
- Source from `assets/product/[slug]/lifestyle/` folder
- Do not use end-user photos or animations (too low quality for this component)

**Example:**
```tsx
<ImageTextBlock
  image="/images/products/example/lifestyle.jpg"
  imageAlt="Child building robot"
  title="Perfect for Young Inventors"
  body="This kit sparks curiosity and inspires creativity..."
  layout="image-left"
  background="white"
/>
```

---

## LearningOutcomes

Checklist of learning outcomes with checkmark icons.

**Props:**
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `outcomes` | `string[]` | Yes | - | List of learning outcomes |
| `title` | `string` | No | `"What They'll Learn"` | Section heading |
| `subtitle` | `string` | No | - | Optional subtitle |
| `image` | `string` | No | - | Optional image path |
| `imageAlt` | `string` | No | `"Learning outcomes illustration"` | Alt text |
| `background` | `"white" \| "gray" \| "navy"` | No | `"white"` | Background color |

**Notes:**
- Green checkmarks on white/gray backgrounds
- Orange checkmarks on navy background

**Example:**
```tsx
<LearningOutcomes
  title="What They'll Learn"
  subtitle="Skills developed through hands-on experimentation"
  outcomes={[
    "Understand basic electronics and circuit design",
    "Learn programming fundamentals",
    "Develop problem-solving skills",
  ]}
  background="white"
/>
```

---

## FeatureGrid

Grid of features with icons.

**Props:**
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `features` | `Feature[]` | Yes | - | Array of features |
| `title` | `string` | No | `"Features"` | Section heading |
| `subtitle` | `string` | No | - | Optional subtitle |
| `columns` | `2 \| 3 \| 4` | No | `3` | Number of columns |
| `background` | `"white" \| "gray" \| "navy"` | No | `"gray"` | Background color |

**Feature:**
```ts
{ icon: string; title: string; description: string }
```

**Available Icons:** `code`, `sensor`, `battery`, `book`, `app`, `tools`, `lightbulb`, `puzzle`, `brain`, `globe`, `shield`, `robot`, `wifi`, `star`, `music`, `microphone`, `compass`, `touch`, `bluetooth`

**Example:**
```tsx
<FeatureGrid
  title="Why Choose This Kit"
  columns={3}
  background="gray"
  features={[
    { icon: "code", title: "Visual Coding", description: "Block-based programming" },
    { icon: "robot", title: "Build Robots", description: "Working motors and sensors" },
    { icon: "book", title: "Guided Learning", description: "Step-by-step instructions" },
  ]}
/>
```

---

## NumberedSteps

Sequential steps with numbered circles.

**Props:**
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `steps` | `Step[]` | Yes | - | Array of steps |
| `title` | `string` | Yes | - | Section heading |
| `subtitle` | `string` | No | - | Optional subtitle |
| `columns` | `2 \| 3 \| 4` | No | `3` | Number of columns |
| `background` | `"white" \| "gray" \| "navy" \| "navy-card"` | No | `"white"` | Background style |

**Step:**
```ts
{ title: string; description: string }
```

**Background Options:**
- `navy-card`: Navy card container on white background (great for visual emphasis)

**Example:**
```tsx
<NumberedSteps
  title="How It Works"
  subtitle="Getting started is easy"
  columns={3}
  background="white"
  steps={[
    { title: "Unbox & Explore", description: "Familiarise yourself with components" },
    { title: "Build", description: "Follow guided instructions" },
    { title: "Program & Play", description: "Bring your creation to life" },
  ]}
/>
```

---

## ProjectShowcase

Grid of project cards with numbered badges.

**Props:**
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `projects` | `Project[]` | Yes | - | Array of projects |
| `title` | `string` | Yes | - | Section heading |
| `subtitle` | `string` | No | - | Optional subtitle |
| `moreText` | `string` | No | - | Text below grid (e.g., "Plus 12 more!") |
| `columns` | `2 \| 3` | No | `3` | Number of columns |
| `background` | `"white" \| "gray" \| "navy"` | No | `"white"` | Background color |

**Project:**
```ts
{ name: string; description: string; concepts?: string; image?: string }
```

**Example:**
```tsx
<ProjectShowcase
  title="Sample Projects"
  subtitle="Just a few of the many projects you can build"
  columns={3}
  projects={[
    { name: "Line-Following Robot", description: "Follows a black line", concepts: "Sensors, loops" },
    { name: "Remote Control Car", description: "Drive with your phone", concepts: "Motors, Bluetooth" },
  ]}
  moreText="Plus 12 more projects included!"
/>
```

---

## CustomerShowcase

Gallery of end-user/customer photos with labels and hover descriptions.

**Props:**
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `images` | `CustomerImage[]` | Yes | - | Array of customer images |
| `title` | `string` | No | `"Customer Creations"` | Section heading |
| `subtitle` | `string` | No | - | Optional subtitle |
| `background` | `"white" \| "gray"` | No | `"white"` | Background color |

**CustomerImage:**
```ts
{ src: string; alt: string; label?: string; description?: string }
```

**Layout Behavior:**
- **1 image:** Full width, 16:9 aspect ratio
- **2 images:** Equal 2-column grid, 4:3 aspect ratio
- **3 images:** Large square left (row-span-2), 2 stacked right (16:9 each)
- **4 images:** Single row of 4 squares
- **5 images:** 2 images top row (4:3), 3 images bottom row (squares)
- **6 images:** 3x2 grid of squares
- **7+ images:** Responsive 2/3/4-column grid of squares

**Image Guidelines:**
- **Only use end-user photos** - customer-submitted, real-world usage photos
- Source from `assets/product/[slug]/end-user/` folder
- Do not use lifestyle or product photos (those belong in ImageTextBlock)
- Labels should be short (1-2 words): "First Build", "Classroom", "Weekend Project"
- Descriptions show on hover and can be longer

**Example:**
```tsx
<CustomerShowcase
  title="Customer Creations"
  subtitle="See what our community has built"
  background="white"
  images={[
    {
      src: "/images/products/example/end-user-robot.jpg",
      alt: "Customer robot build",
      label: "First Build",
      description: "Built this robot in just one weekend!",
    },
    {
      src: "/images/products/example/end-user-classroom.jpg",
      alt: "Classroom project",
      label: "Classroom",
      description: "Grade 6 students showing off their creations.",
    },
  ]}
/>
```

---

## WhatsIncluded

Checklist of box contents.

**Props:**
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `items` | `string[]` | Yes | - | List of included items |
| `title` | `string` | No | `"What's in the Box"` | Section heading |
| `image` | `string` | No | - | Optional product image |
| `imageAlt` | `string` | No | `"Box contents"` | Alt text |
| `background` | `"white" \| "gray"` | No | `"gray"` | Background color |

**Example:**
```tsx
<WhatsIncluded
  title="What's in the Box"
  background="gray"
  items={[
    "Main controller unit",
    "2x DC motors",
    "Touch sensor",
    "USB charging cable",
    "Project guidebook",
  ]}
/>
```

---

## VideoEmbed

Embedded YouTube or Vimeo video.

**Props:**
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `url` | `string` | Yes | - | YouTube or Vimeo URL |
| `title` | `string` | No | - | Optional section heading |
| `aspectRatio` | `"16:9" \| "4:3" \| "1:1"` | No | `"16:9"` | Video aspect ratio |
| `background` | `"white" \| "gray" \| "navy"` | No | `"white"` | Background color |

**Supported URL Formats:**
- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://vimeo.com/VIDEO_ID`

**Example:**
```tsx
<VideoEmbed
  url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  title="See It in Action"
  aspectRatio="16:9"
  background="white"
/>
```

---

## Specifications

Product specifications in table format.

**Props:**
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `specs` | `Spec[]` | Yes | - | Array of specifications |
| `title` | `string` | No | `"Specifications"` | Section heading |
| `background` | `"white" \| "gray"` | No | `"gray"` | Background color |

**Spec:**
```ts
{ label: string; value: string }
```

**Example:**
```tsx
<Specifications
  title="Technical Specifications"
  background="gray"
  specs={[
    { label: "Recommended Age", value: "10+ years" },
    { label: "Number of Pieces", value: "358 components" },
    { label: "Battery", value: "Rechargeable Li-ion (included)" },
    { label: "Connectivity", value: "Bluetooth 5.0" },
  ]}
/>
```

---

## ProductTestimonials

Customer reviews with star ratings.

**Props:**
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `testimonials` | `Testimonial[]` | Yes | - | Array of testimonials |
| `title` | `string` | No | `"What Parents Are Saying"` | Section heading |
| `background` | `"white" \| "gray" \| "navy"` | No | `"white"` | Background color |

**Testimonial:**
```ts
{ quote: string; author: string; role?: string; avatar?: string; rating?: number }
```

**Notes:**
- Grid auto-adjusts for 1, 2, or 3+ testimonials
- Star ratings use orange color

**Example:**
```tsx
<ProductTestimonials
  title="What Parents Are Saying"
  background="white"
  testimonials={[
    { quote: "My son loves it!", author: "Sarah M.", role: "Parent", rating: 5 },
    { quote: "Great quality.", author: "David K.", rating: 5 },
  ]}
/>
```

---

## ProductFAQ

Accordion-style frequently asked questions.

**Props:**
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `faqs` | `FAQ[]` | Yes | - | Array of FAQs |
| `title` | `string` | No | `"Frequently Asked Questions"` | Section heading |
| `background` | `"white" \| "gray"` | No | `"white"` | Background color |

**FAQ:**
```ts
{ question: string; answer: string }
```

**Example:**
```tsx
<ProductFAQ
  title="Frequently Asked Questions"
  background="white"
  faqs={[
    { question: "What age is this suitable for?", answer: "Ages 10 and above." },
    { question: "Are batteries included?", answer: "Yes, rechargeable battery included." },
  ]}
/>
```

---

## CallToAction

Call to action section with buttons.

**Props:**
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `title` | `string` | Yes | - | Heading text |
| `subtitle` | `string` | No | - | Subheading text |
| `primaryLabel` | `string` | Yes | - | Primary button text |
| `primaryHref` | `string` | Yes | - | Primary button link |
| `secondaryLabel` | `string` | No | - | Secondary button text |
| `secondaryHref` | `string` | No | - | Secondary button link |
| `background` | `"white" \| "gray" \| "navy"` | No | `"navy"` | Background color |

**Example:**
```tsx
<CallToAction
  title="Ready to Start the STEM Journey?"
  subtitle="Order now and inspire a love of learning"
  primaryLabel="Add to Cart"
  primaryHref="#product-actions"
  secondaryLabel="View All Kits"
  secondaryHref="/shop"
  background="navy"
/>
```

---

## HeroSection

Product hero with gallery, pricing, and add to cart. **Requires Shopify product data.**

**Props:**
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `product` | `ProductDetail` | Yes | - | Shopify product data |
| `tagline` | `string` | No | - | Short tagline under title |
| `highlights` | `string[]` | No | - | Bullet points of key features |
| `heroImage` | `string` | No | - | Custom hero image (prepended to gallery) |
| `addons` | `SerializedAddon[]` | No | - | Product add-ons for upselling |

**Example:**
```tsx
<HeroSection
  product={product}
  tagline="The perfect introduction to electronics"
  highlights={[
    "15+ hands-on projects",
    "No soldering required",
    "Comprehensive guidebook included",
  ]}
  addons={addons}
/>
```

---

## RelatedProducts

Grid of related product cards. **Requires Shopify product data.**

**Props:**
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `products` | `RelatedProduct[]` | Yes | - | Array of product data |
| `title` | `string` | No | `"You May Also Like"` | Section heading |
| `background` | `"white" \| "gray" \| "navy"` | No | `"gray"` | Background color |

**Notes:**
- Displays up to 4 products
- Returns null if products array is empty

**Example:**
```tsx
<RelatedProducts
  title="You May Also Like"
  products={relatedProducts}
  background="gray"
/>
```
