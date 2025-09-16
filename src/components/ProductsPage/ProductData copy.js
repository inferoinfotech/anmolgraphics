const products = [
    {
        id: 1,
        slug: "metal-swivel-hooks-and-snap-clips-set",
        images: ["/assets/images/metal-hooks.jpg"],
        title: "Metal Swivel Hooks & Snap Clips Set",
        description:
            "Premium set of metal swivel hooks and snap clips designed for durability and everyday use. These rust-resistant, polished hooks are ideal for attaching to ID cards, keychains, lanyards, and badge holders. Featuring multiple styles and sizes, they provide versatile solutions for schools, companies, and events.",
        category: "Lanyard Accessories",
        hashtags: ["#lanyardhooks", "#badgeclips", "#swivelhooks", "#idcardaccessories"],
        highlights: [
            "Durable metal construction",
            "Polished anti-rust finish",
            "Multiple hook styles for versatile use",
            "Perfect for ID cards, badges, and lanyards"
        ]
    },
    {
        id: 2,
        slug: "alligator-clip-and-swivel-hook-combo",
        images: ["/assets/images/combo-hooks.jpg"],
        title: "Alligator Clip & Swivel Hook Combo",
        description:
            "A versatile combo set including an alligator clip with strap, a swivel snap hook, and an oval swivel hook. Perfect for securely attaching ID cards, name badges, or keychains. Lightweight and reliable, this set is suitable for office staff, schools, and event organizers.",
        category: "Lanyard Accessories",
        hashtags: ["#idclip", "#lanyardclip", "#badgeholder", "#officeuse"],
        highlights: [
            "Set of 3 popular clip styles",
            "Easy to attach to lanyards and straps",
            "Lightweight yet durable",
            "Ideal for office, school, and events"
        ]
    },
    {
        id: 3,
        slug: "plastic-and-metal-hooks-mixed-set",
        images: ["/assets/images/plastic-metal-mix.jpg"],
        title: "Plastic & Metal Hooks Mixed Set",
        description:
            "Upgrade your lanyards and accessories with this premium set of plastic and metal hooks & clips. Designed for durability and everyday use, these hooks are lightweight, rust-resistant, and easy to attach to ID cards, keychains, and badge holders. The set includes multiple styles—swivel hooks, snap hooks, alligator clips, and buckle clips—offering versatile options for offices, events, schools, and promotional use.",
        category: "Identity Cards",
        hashtags: ["#identitycard", "#school", "#corporate", "#security"],
        highlights: [
            "High-quality plastic and metal build",
            "Includes multiple clip & hook styles",
            "Perfect for schools, companies, and events",
            "Lightweight, durable, and rust-resistant"
        ]
    },
    {
        id: 4,
        slug: "round-button-badges-multi-designs-sizes",
        images: ["4", "5", "6", "7", "8", "10", "11", "12", "13"],
        title: "Round Button Badges (Multiple Designs & Sizes)",
        description:
            "High-quality round button badges with pin-back. Perfect for branding, events, schools, promos, and giveaways. Vibrant prints with a smooth protective finish.",
        category: "Badges",
        hashtags: ["#buttonbadge", "#roundbadge", "#promotional", "#events", "#branding"],
        highlights: [
            "Crisp full-color prints",
            "Durable pin-back mechanism",
            "Multiple sizes (e.g., 44mm, 58mm)",
            "Custom artwork supported"
        ]
    },
    {
        id: 5,
        slug: "ribbon-rosette-award-badges",
        images: ["3"],
        title: "Ribbon Rosette Award Badges",
        description:
            "Colorful rosette badges with center logo/text — ideal for prize distribution, annual days, and special recognition events.",
        category: "Awards & Recognition",
        hashtags: ["#rosette", "#awardbadge", "#prizeday", "#school", "#eventbadge"],
        highlights: [
            "Premium ribbon rosette",
            "Custom center logo/text",
            "Secure pin fastening",
            "Great for ceremonies & competitions"
        ]
    },
    {
        id: 6,
        slug: "custom-name-badges-name-plates",
        images: ["02", "03", "9", "27", "28", "IMG-20250501-WA0018"],
        title: "Custom Name Badges / Name Plates",
        description:
            "Professional name badges and plates for staff, schools, and events. Options in metal/plastic with pin or magnetic backs, customized with name, role, and logo.",
        category: "Name Badges",
        hashtags: ["#namebadge", "#nametag", "#staffbadge", "#corporate", "#school"],
        highlights: [
            "Customizable with name, role & logo",
            "Metal/plastic options, pin or magnetic back",
            "Clean, professional look",
            "Ideal for offices, receptions & events"
        ]
    },
    {
        id: 7,
        slug: "metal-keychains-premium-models",
        images: [
            "1.png",
            "2.png",
            "3.png",
            "4.png",
            "5.png",
            "6.png",
            "7.png",
            "8.png"
        ],
        title: "Premium Metal Keychains (Multiple Models)",
        description:
            "Durable and stylish metal keychains available in multiple models and shapes. Ideal for gifting, promotional use, and everyday utility. Comes in sleek designs with premium finishing.",
        category: "Keychains",
        hashtags: ["#metalkeychain", "#keyring", "#corporategift", "#promotional"],
        highlights: [
            "Available in multiple models and shapes",
            "High-quality polished metal finish",
            "Strong and long-lasting keyring",
            "Perfect for corporate gifts & promos"
        ]
    },
    {
        id: 8,
        slug: "fabric-and-printed-keychains",
        images: ["9.png", "10.png", "11.png", "12.png"],
        title: "Fabric & Printed Keychains",
        description:
            "Trendy fabric and printed keychains with vibrant designs and logos. Lightweight, durable, and customizable — perfect for branding, events, and giveaways.",
        category: "Keychains",
        hashtags: ["#fabrickeychain", "#printedkeychain", "#lanyardkeychain", "#branding"],
        highlights: [
            "Soft fabric with strong stitching",
            "Custom print and logo options",
            "Lightweight and stylish designs",
            "Great for events, promos & branding"
        ]
    },
    {
        id: 9,
        slug: "corporate-and-institution-custom-medals",
        images: ["1.png", "2.png", "6.png", "7.png", "8.png", "10.png"],
        title: "Corporate & Institution Custom Medals",
        description:
            "Premium-quality medals designed for banks, schools, universities, and institutions. Available in gold, silver, and bronze finishes with customized engraving or embossed logos.",
        category: "Medals",
        hashtags: ["#custommedals", "#institutionmedal", "#corporategift", "#schoolaward"],
        highlights: [
            "Custom logo and text engraving",
            "Available in gold, silver, and bronze",
            "Durable metal build with ribbon options",
            "Perfect for institutions, schools & organizations"
        ]
    },
    {
        id: 10,
        slug: "sports-and-marathon-finisher-medals",
        images: ["3.png", "4.png", "5.png", "9.png"],
        title: "Sports & Marathon Finisher Medals",
        description:
            "Exclusive medals for sports events, marathons, and fitness challenges. Unique shapes and premium finishes to honor participants and winners.",
        category: "Medals",
        hashtags: ["#sportsmedal", "#marathonmedal", "#finishermedal", "#eventawards"],
        highlights: [
            "Creative and unique shapes",
            "High-quality finishing",
            "Perfect for marathons, runs & competitions",
            "Durable with strong ribbon attachment"
        ]
    },
    {
        id: 11,
        slug: "id-and-membership-cards",
        images: ["1.png", "2.png", "3.png"],
        title: "Custom ID & Membership Cards",
        description:
            "High-quality PVC ID and membership cards for schools, colleges, clubs, and corporate use. Durable, professional, and customizable with logos, photos, and QR/barcodes.",
        category: "Cards",
        hashtags: ["#idcard", "#membershipcard", "#schoolid", "#corporateid"],
        highlights: [
            "Durable PVC material",
            "Customizable with photo, logo & text",
            "Barcode/QR/Smart card options",
            "Ideal for schools, colleges, gyms & clubs"
        ]
    },
    {
        id: 12,
        slug: "gift-and-privilege-cards",
        images: ["4.png", "5.png"],
        title: "Gift & Privilege Cards",
        description:
            "Stylish gift cards and privilege cards for retail stores, clubs, and businesses. Customizable designs with brand identity, offering premium customer experience.",
        category: "Cards",
        hashtags: ["#giftcard", "#privilegecard", "#loyaltycard", "#retail"],
        highlights: [
            "Custom gift card & voucher printing",
            "Privilege & loyalty card options",
            "Premium finish for brand identity",
            "Perfect for retail stores & businesses"
        ]
    },
    {
        id: 13,
        slug: "custom-printed-mouse-pads",
        images: ["1.png", "2.png", "3.png", "4.png", "5.png"],
        title: "Custom Printed Mouse Pads",
        description:
            "High-quality mouse pads with full-color printing. Durable, smooth surface with anti-slip base. Perfect for corporate branding, promotional giveaways, and personal use.",
        category: "Mouse Pads",
        hashtags: ["#mousepad", "#custommousepad", "#corporategift", "#branding"],
        highlights: [
            "Full-color custom printing",
            "Durable and smooth surface",
            "Anti-slip rubber base",
            "Perfect for corporate branding & promotions"
        ]
    }
]


export default products;
