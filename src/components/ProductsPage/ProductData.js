const products = [
    {
        id: 1,
        slug: "custom-identity-cards-for-schools-and-companies",
        images: ["/assets/images/26.jpg"],
        title: "Custom Identity Cards for Schools & Companies",
        description:
            "Durable, personalized identity cards for schools, companies, and organizations. Our high-quality cards are available in various designs and can be customized with your logo, text, and more.",
        category: "Identity Cards",
        hashtags: ["#identitycard", "#school", "#corporate", "#security"],
        highlights: [
            "High-quality durable PVC",
            "Customizable with logo and text",
            "Suitable for schools and companies",
            "Secure identity verification"
        ]
    },
    {
        id: 2,
        slug: "professional-company-id-cards",
        images: [
            "/assets/images/feature-1.jpg",
        ],
        title: "Professional Company ID Cards",
        description: "High-quality company ID cards with secure printing, barcodes, and RFID options. Customizable for businesses of all sizes.These cards come in two stunning colors: gold glitter and silver glitter. The real glitter cards feature fashionable patterns enhanced by the sparkling and shining effects of actual glitter, adding a touch of glamour to the design. These cards have a wide range of applications, including in schools, colleges, banking, corporations, malls, events, exhibitions, and special events. Get ready to add some shine to your cards with Bharti Cards' glittery PVC options.",
        category: "Identity Cards",
        hashtags: ["#identitycard", "#office", "#corporate"],
        highlights: [
            "PVC Glitter Cards in Gold, Silver",
            "Dazzling Touch with Actual Glitter",
            "Wide Applications in Various Fields",
            "Easy and Simple Card Making Process"
        ]
    },
    {
        id: 3,
        slug: "rfid-smart-cards",
        images: ["/assets/images/feature-4.jpg"],
        title: "RFID Smart Cards",
        description:
            "RFID-enabled smart cards for secure access and tracking. Ideal for offices, schools, and event management.",
        category: "Identity Cards",
        hashtags: ["#rfid", "#smartcard", "#security"],
        highlights: [
            "RFID chip integration",
            "Secure access control",
            "Ideal for events and offices",
            "Trackable and tamper-proof"
        ]
    },
    {
        id: 4,
        slug: "blue-lanyard",
        images: ["/assets/images/18.jpg"],
        title: "Blue Lanyard",
        description:
            "Premium-quality blue lanyard with a strong hook, perfect for ID cards and badges.",
        category: "Multicolored Lanyards",
        hashtags: ["#identitycard", "#blue", "#branding"],
        highlights: [
            "Durable woven fabric",
            "Strong metal hook",
            "Ideal for schools and events",
            "Comfortable for long wear"
        ]
    },
    {
        id: 5,
        slug: "printed-lanyard",
        images: ["/assets/images/printed-lanyard.jpg"],
        title: "Printed Lanyard",
        description:
            "Custom printed lanyards with your company logo or text, available in various colors and materials.",
        category: "Multicolored Lanyards",
        hashtags: ["#lanyard", "#custom", "#printed"],
        highlights: [
            "Full-color printing available",
            "Custom branding support",
            "Durable materials",
            "Perfect for events and staff"
        ]
    },
    {
        id: 6,
        slug: "custom-lanyard",
        images: ["/assets/images/custom-lanyard.jpg"],
        title: "Custom Lanyard",
        description:
            "Fully customizable lanyards with high-quality printing, perfect for branding and events.",
        category: "Multicolored Lanyards",
        hashtags: ["#lanyard", "#custom", "#branding"],
        highlights: [
            "Multiple color options",
            "Custom text & logo printing",
            "Ideal for corporate branding",
            "Comfortable and strong"
        ]
    },
    {
        id: 7,
        slug: "custom-mug",
        images: ["/assets/images/custom-mug.jpg"],
        title: "Custom Mug",
        description:
            "Personalized mugs with high-quality printing. Ideal for gifts, branding, and promotional purposes.",
        category: "Printed Mugs",
        hashtags: ["#mug", "#custom", "#branding"],
        highlights: [
            "Full-wrap design",
            "Photo/logo support",
            "Dishwasher safe",
            "Great for gifting"
        ]
    },
    {
        id: 8,
        slug: "corporate-mug",
        images: ["/assets/images/corporate-mug.jpg"],
        title: "Corporate Mug",
        description:
            "Elegant corporate mugs with your company logo, perfect for office use and client giveaways.",
        category: "Printed Mugs",
        hashtags: ["#mug", "#corporate", "#branding"],
        highlights: [
            "Elegant matte finish",
            "Custom logo printing",
            "Ideal for clients & staff",
            "Perfect for corporate gifts"
        ]
    },
    {
        id: 9,
        slug: "photo-print-mug",
        images: ["/assets/images/photo-mug.jpg"],
        title: "Photo Print Mug",
        description:
            "Custom photo-printed mugs, a great personalized gift for any occasion.",
        category: "Printed Mugs",
        hashtags: ["#mug", "#photo", "#gift"],
        highlights: [
            "High-resolution print",
            "Personalized for events",
            "Durable ceramic build",
            "Microwave safe"
        ]
    },
    {
        id: 10,
        slug: "gold-medal",
        images: ["/assets/images/gold-medal.jpg"],
        title: "Gold Medal",
        description:
            "High-quality gold medals with engraving options, ideal for sports and academic achievements.",
        category: "Medals",
        hashtags: ["#medal", "#gold", "#achievement"],
        highlights: [
            "Shiny gold finish",
            "Custom engraving available",
            "Includes ribbon",
            "Perfect for competitions"
        ]
    },
    {
        id: 11,
        slug: "silver-medal",
        images: ["/assets/images/silver-medal.jpg"],
        title: "Silver Medal",
        description:
            "Premium silver medals with custom engraving for competitions and recognition.",
        category: "Medals",
        hashtags: ["#medal", "#silver", "#award"],
        highlights: [
            "Bright silver plating",
            "Laser engraved text/logo",
            "Elegant award ribbon",
            "Ideal for 2nd place finishes"
        ]
    },
    {
        id: 12,
        slug: "bronze-medal",
        images: ["/assets/images/bronze-medal.jpg"],
        title: "Bronze Medal",
        description:
            "Durable bronze medals with detailed design, suitable for awards and achievements.",
        category: "Medals",
        hashtags: ["#medal", "#bronze", "#recognition"],
        highlights: [
            "Detailed embossing",
            "Rust-resistant bronze",
            "Includes lanyard",
            "Great for all events"
        ]
    },
    {
        id: 13,
        slug: "crystal-trophy",
        images: ["/assets/images/crystal-trophy.jpg"],
        title: "Crystal Trophy",
        description:
            "Elegant crystal trophies for corporate awards, achievements, and sports events.",
        category: "Trophies",
        hashtags: ["#trophy", "#crystal", "#award"],
        highlights: [
            "High-quality glass",
            "Engraving ready",
            "Elegant for any ceremony",
            "Comes in presentation box"
        ]
    },
    {
        id: 14,
        slug: "wooden-trophy",
        images: ["/assets/images/wooden-trophy.jpg"],
        title: "Wooden Trophy",
        description:
            "High-quality wooden trophies with custom engraving, perfect for various award ceremonies.",
        category: "Trophies",
        hashtags: ["#trophy", "#wooden", "#engraving"],
        highlights: [
            "Natural wood finish",
            "Custom laser engraving",
            "Premium build quality",
            "Great for academic use"
        ]
    },
    {
        id: 15,
        slug: "custom-engraved-trophy",
        images: ["/assets/images/custom-trophy.jpg"],
        title: "Custom Engraved Trophy",
        description:
            "Fully customized trophies with engraving, logos, and unique designs to match your event needs.",
        category: "Trophies",
        hashtags: ["#trophy", "#custom", "#engraving"],
        highlights: [
            "Unique shape designs",
            "Fully personalized content",
            "High detail engraving",
            "Perfect for branding events"
        ]
    }
];

export default products;
