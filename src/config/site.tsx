import React from "react";

export const webMetaData = {
  url: "https://about-me.tongducthanhnam.id.vn",
  name: "In4 về tớ",
  description: "Information about me",
  image: "/images/ins.webp",
};

export const macbook = {
  content: (
    <span>
      Different is better than better
      <br />
      Never stop learning and trying new things
    </span>
  ),
  image: "/images/ins.webp",
};

export const introduce = {
  content: (
    <>
      <h1 className="text-4xl md:text-5xl font-bold leading-tight">
        Introduce 😇
      </h1>
      <p className="text-xl ">
        I have an passion for technology and a strong desire to create products
        that bring value to the community.
      </p>
    </>
  ),
  strength: [
    "I have wide knowledge in many fields of technology",
    "I have a strong passion and sense of responsibility",
    "Willing to explore and create to bring value to the community",
  ],
  gltfModel: "/models/card.glb", // Path: public/models/card.glb -> Read README.md to know how to create this file
  texture: "/models/brand.png", // Path: public/models/brand.png -> Size 1024x248
};

export const appleCardData = [
  {
    category: "Trò chơi",
    title: "Tớ thích chơi game",
    src: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=3556&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: (
      <div>
        <h1 className="text-4xl md:text-5xl text-white font-bold leading-tight">
          Tớ thích chơi game
        </h1>
        <p className="text-xl text-gray-300">
          Tớ thích chơi game, đặc biệt là game bắn súng
        </p>
      </div>
    ),
  },
  {
    category: "Công nghệ",
    title: "Tớ quan tâm đến các sản phẩm công nghệ",
    src: "https://images.unsplash.com/photo-1713869791518-a770879e60dc?q=80&w=2333&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: (
      <div>
        <h1 className="text-4xl md:text-5xl text-white font-bold leading-tight">
          Tớ quan tâm đến các sản phẩm công nghệ
        </h1>
        <p className="text-xl text-gray-300">
          Tớ thích sưu tầm các sản phẩm công nghệ mới
        </p>
      </div>
    ),
  },
  {
    category: "Du lịch",
    title: "Tớ thường đi phịch ở những nơi thiên nhiên vào dịp lễ.",
    src: "https://images.unsplash.com/photo-1602081957921-9137a5d6eaee?q=80&w=2793&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: (
      <div>
        <h1 className="text-4xl md:text-5xl text-white font-bold leading-tight">
          Tớ thường đi phịch ở những nơi thiên nhiên vào dịp lễ.
        </h1>
        <p className="text-xl text-gray-300">Tớ thích khám phá những nơi mới</p>
      </div>
    ),
  },
  {
    category: "Khám phá",
    title: "Tớ thường đi mấy quán cafe có mang âm hưởng châu á",
    src: "https://images.unsplash.com/photo-1730386114671-b1112a4c3959?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: (
      <div>
        <h1 className="text-4xl md:text-5xl text-white font-bold leading-tight">
          Tớ thường đi mấy quán cafe có mang âm hưởng châu á
        </h1>
        <p className="text-xl text-gray-300">
          Tớ thích khám phá những quán cafe mới
        </p>
      </div>
    ),
  },
];

export const compareData = {
  title: "I always try to be better",
  firstImage:
    "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  secondImage:
    "https://images.unsplash.com/photo-1523287562758-66c7fc58967f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

export const highlightData = {
  text: "Không có bạn, cuộc sống của tớ sẽ trở nên ",
  highlight: "đen tối, ảm đạm, vô vị, 🤥",
};

export const timelineData = [
  {
    title: "2020",
    content: (
      <div>
        <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
          In 2020, I graduated from high school and began my journey of seeking
          new knowledge. I learned many new things and had exciting experiences.
        </p>
        <div className="grid grid-cols-2 gap-4">
          {/*<img*/}
          {/*    loading={"lazy"}*/}

          {/*    src="https://assets.aceternity.com/templates/startup-1.webp"*/}
          {/*    alt="startup template"*/}
          {/*    width={500}*/}
          {/*    height={500}*/}
          {/*    className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"*/}
          {/*/>*/}
          {/*<img*/}
          {/*    loading={"lazy"}*/}
          {/*    src="https://assets.aceternity.com/templates/startup-2.webp"*/}
          {/*    alt="startup template"*/}
          {/*    width={500}*/}
          {/*    height={500}*/}
          {/*    className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"*/}
          {/*/>*/}
          {/*<img*/}
          {/*    loading={"lazy"}*/}

          {/*    src="https://assets.aceternity.com/templates/startup-3.webp"*/}
          {/*    alt="startup template"*/}
          {/*    width={500}*/}
          {/*    height={500}*/}
          {/*    className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"*/}
          {/*/>*/}
          {/*<img*/}
          {/*    loading={"lazy"}*/}

          {/*    src="https://assets.aceternity.com/templates/startup-4.webp"*/}
          {/*    alt="startup template"*/}
          {/*    width={500}*/}
          {/*    height={500}*/}
          {/*    className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"*/}
          {/*/>*/}
        </div>
      </div>
    ),
  },
  {
    title: "2021",
    content: (
      <div>
        <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
          That year, the Covid pandemic began to spread widely, and many
          unfortunate things happened. However, I still tried to learn and
          improve myself.
        </p>
        <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
          I had time to reflect on life and realized that I need to change even
          more. I want to create technological products that help the community
          and bring breakthrough development.
        </p>
        <div className="grid grid-cols-2 gap-4">
          {/*<img*/}
          {/*    loading={"lazy"}*/}

          {/*    src="https://assets.aceternity.com/pro/hero-sections.png"*/}
          {/*    alt="hero template"*/}
          {/*    width={500}*/}
          {/*    height={500}*/}
          {/*    className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"*/}
          {/*/>*/}
          {/*<img*/}
          {/*    loading={"lazy"}*/}

          {/*    src="https://assets.aceternity.com/features-section.png"*/}
          {/*    alt="feature template"*/}
          {/*    width={500}*/}
          {/*    height={500}*/}
          {/*    className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"*/}
          {/*/>*/}
          {/*<img*/}
          {/*    loading={"lazy"}*/}

          {/*    src="https://assets.aceternity.com/pro/bento-grids.png"*/}
          {/*    alt="bento template"*/}
          {/*    width={500}*/}
          {/*    height={500}*/}
          {/*    className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"*/}
          {/*/>*/}
          {/*<img*/}
          {/*    loading={"lazy"}*/}

          {/*    src="https://assets.aceternity.com/cards.png"*/}
          {/*    alt="cards template"*/}
          {/*    width={500}*/}
          {/*    height={500}*/}
          {/*    className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"*/}
          {/*/>*/}
        </div>
      </div>
    ),
  },
  {
    title: "2022",
    content: (
      <div>
        <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
          When the pandemic ended, I had more opportunities to carry out the
          projects I had planned earlier.
        </p>
        <div className="grid grid-cols-2 gap-4">
          {/*<img*/}
          {/*    loading={"lazy"}*/}

          {/*    src="https://assets.aceternity.com/pro/hero-sections.png"*/}
          {/*    alt="hero template"*/}
          {/*    width={500}*/}
          {/*    height={500}*/}
          {/*    className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"*/}
          {/*/>*/}
          {/*<img loading={"lazy"}*/}

          {/*     src="https://assets.aceternity.com/features-section.png"*/}
          {/*     alt="feature template"*/}
          {/*     width={500}*/}
          {/*     height={500}*/}
          {/*     className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"*/}
          {/*/>*/}
          {/*<img loading={"lazy"}*/}

          {/*     src="https://assets.aceternity.com/pro/bento-grids.png"*/}
          {/*     alt="bento template"*/}
          {/*     width={500}*/}
          {/*     height={500}*/}
          {/*     className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"*/}
          {/*/>*/}
          {/*<img*/}
          {/*    loading={"lazy"}*/}

          {/*    src="https://assets.aceternity.com/cards.png"*/}
          {/*    alt="cards template"*/}
          {/*    width={500}*/}
          {/*    height={500}*/}
          {/*    className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"*/}
          {/*/>*/}
        </div>
      </div>
    ),
  },
  {
    title: "2023",
    content: (
      <div>
        <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
          I had exciting experiences and learned many new things. I feel happy
          to have such wonderful friends.
        </p>
        <div className="grid grid-cols-2 gap-4">
          {/*<img*/}
          {/*    loading={"lazy"}*/}

          {/*    src="https://assets.aceternity.com/pro/hero-sections.png"*/}
          {/*    alt="hero template"*/}
          {/*    width={500}*/}
          {/*    height={500}*/}
          {/*    className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"*/}
          {/*/>*/}
          {/*<img*/}
          {/*    loading={"lazy"}*/}

          {/*    src="https://assets.aceternity.com/features-section.png"*/}
          {/*    alt="feature template"*/}
          {/*    width={500}*/}
          {/*    height={500}*/}
          {/*    className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"*/}
          {/*/>*/}
        </div>
      </div>
    ),
  },
  {
    title: "At present",
    content: (
      <div>
        <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
          At present, I am studying and developing myself every day. I feel
          happy to have such wonderful friends. I am looking forward to new
          projects and exciting experiences. I hope to gain more knowledge,
          experience, and opportunities to grow further.
        </p>
        <div className="grid grid-cols-2 gap-4">
          {/*<img*/}
          {/*    loading={"lazy"}*/}
          {/*    src="https://assets.aceternity.com/pro/hero-sections.png"*/}
          {/*    alt="hero template"*/}
          {/*    width={500}*/}
          {/*    height={500}*/}
          {/*    className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"*/}
          {/*/>*/}
          {/*<img*/}
          {/*    loading={"lazy"}*/}

          {/*    src="https://assets.aceternity.com/features-section.png"*/}
          {/*    alt="feature template"*/}
          {/*    width={500}*/}
          {/*    height={500}*/}
          {/*    className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"*/}
          {/*/>*/}
        </div>
      </div>
    ),
  },
];

export const threeDCardData = {
  title: "Đó là một chút thông tin về tớ",
  content:
    "Nếu cậu thấy thích thì hãy nhấn vào nút bên dưới để tìm hiểu thêm về nhau nhé",
  image:
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};
