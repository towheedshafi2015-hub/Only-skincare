For a **$1,000 D2C website**, you're not selling a product anymore. You're selling **trust** first, then **desire**, then **certainty**, and finally **urgency**.

The biggest mistake I see on most Shopify stores is that they look like a product catalog.

The highest-converting stores feel like a **brand**.

If you study brands like **Apple, Gymshark, Huel, Ridge, Allbirds, Who Gives A Crap, Lululemon, Glossier, Caraway, and Rothy's**, you'll notice they all follow almost the same psychological flow.

They answer these questions in order:

1. Why should I care?  
2. Why should I trust you?  
3. Why is this product different?  
4. Will it solve my problem?  
5. Can I believe these claims?  
6. Is it worth the money?  
7. What happens if I don't buy?  
8. Why should I buy now?

Your homepage should do exactly that.

Brand name: Only Skincare  
founder:: Owais Khan (20years)

---

# **Homepage Architecture**

I personally wouldn't go beyond **20-22 sections**.

Every section must have one job.

---

# **1\. Announcement Bar**

Purpose:  
 Urgency \+ Shipping \+ Trust

Example

🚚 Free Shipping above ₹999  
 | 30 Day Returns  
 | 20,000+ Happy Customers  
 | 0% complaints

it should be endless scroll. Endless scroll should be at the top level. Just do it. 

---

# **2\. Navigation**

Logo 

Collections

Shop

About

Reviews

Track Order

Contact

Search

Cart

Never clutter navigation.

You are given a task to integrate an existing React component in the codebase

The codebase should support:

\- shadcn project structure  

\- Tailwind CSS

\- Typescript

If it doesn't, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.

Determine the default path for components and styles. 

If default path for components is not /components/ui, provide instructions on why it's important to create this folder

Copy-paste this component to /components/ui folder:

\`\`\`tsx

tubelight-navbar.tsx

"use client"

import React, { useEffect, useState } from "react"

import { motion } from "framer-motion"

import Link from "next/link"

import { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

interface NavItem {

  name: string

  url: string

  icon: LucideIcon

}

interface NavBarProps {

  items: NavItem\[\]

  className?: string

}

export function NavBar({ items, className }: NavBarProps) {

  const \[activeTab, setActiveTab\] \= useState(items\[0\].name)

  const \[isMobile, setIsMobile\] \= useState(false)

  useEffect(() \=\> {

    const handleResize \= () \=\> {

      setIsMobile(window.innerWidth \< 768\)

    }

    handleResize()

    window.addEventListener("resize", handleResize)

    return () \=\> window.removeEventListener("resize", handleResize)

  }, \[\])

  return (

    \<div

      className={cn(

        "fixed bottom-0 sm:top-0 left-1/2 \-translate-x-1/2 z-50 mb-6 sm:pt-6",

        className,

      )}

    \>

      \<div className="flex items-center gap-3 bg-background/5 border border-border backdrop-blur-lg py-1 px-1 rounded-full shadow-lg"\>

        {items.map((item) \=\> {

          const Icon \= item.icon

          const isActive \= activeTab \=== item.name

          return (

            \<Link

              key={item.name}

              href={item.url}

              onClick={() \=\> setActiveTab(item.name)}

              className={cn(

                "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",

                "text-foreground/80 hover:text-primary",

                isActive && "bg-muted text-primary",

              )}

            \>

              \<span className="hidden md:inline"\>{item.name}\</span\>

              \<span className="md:hidden"\>

                \<Icon size={18} strokeWidth={2.5} /\>

              \</span\>

              {isActive && (

                \<motion.div

                  layoutId="lamp"

                  className="absolute inset-0 w-full bg-primary/5 rounded-full \-z-10"

                  initial={false}

                  transition={{

                    type: "spring",

                    stiffness: 300,

                    damping: 30,

                  }}

                \>

                  \<div className="absolute \-top-2 left-1/2 \-translate-x-1/2 w-8 h-1 bg-primary rounded-t-full"\>

                    \<div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md \-top-2 \-left-2" /\>

                    \<div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md \-top-1" /\>

                    \<div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" /\>

                  \</div\>

                \</motion.div\>

              )}

            \</Link\>

          )

        })}

      \</div\>

    \</div\>

  )

}

demo.tsx

import { Home, User, Briefcase, FileText } from 'lucide-react'

import { NavBar } from "@/components/ui/tubelight-navbar"

export function NavBarDemo() {

  const navItems \= \[

    { name: 'Home', url: '\#', icon: Home },

    { name: 'About', url: '\#', icon: User },

    { name: 'Projects', url: '\#', icon: Briefcase },

    { name: 'Resume', url: '\#', icon: FileText }

  \]

  return \<NavBar items={navItems} /\>

}

\`\`\`

Install NPM dependencies:

\`\`\`bash

lucide-react, framer-motion

\`\`\`

Implementation Guidelines

 1\. Analyze the component structure and identify all required dependencies

 2\. Review the component's argumens and state

 3\. Identify any required context providers or hooks and install them

 4\. Questions to Ask

 \- What data/props will be passed to this component?

 \- Are there any specific state management requirements?

 \- Are there any required assets (images, icons, etc.)?

 \- What is the expected responsive behavior?

 \- What is the best place to use this component in the app?

Steps to integrate

 0\. Copy paste all the code above in the correct directories

 1\. Install external dependencies

 2\. Fill image assets with Unsplash stock images you know exist

 3\. Use lucide-react icons for svgs or logos if component requires them

Use this code as reference While you create this amazing header section.

---

# **3\. Hero Section**

This is where most stores fail.

Structure

Headline

Subheadline

Primary CTA

Secondary CTA

Lifestyle Image / Video

USP Icons

Example

Headline

Skincare That Actually Works.

Subheadline

Science-backed formulations trusted by 50,000+ customers for healthier skin.

Buttons

Shop Best Sellers

Take Skin Quiz

**USP**

Dermatologist Tested

Cruelty Free

Made in South Korea for Indian skin

30-Day Guarantee.

---

# **4\. Social Proof Strip**

Immediately after hero.

Logos

"As Seen In"

Or

Instagram followers

Orders

Reviews

Countries

Example

★★★★★ 4.9 Rating

70,000+ Customers

15 Million Views

500+ Influencers

---

# **5\. Featured Collection**

Best Sellers

3–6 products

Nothing more.

Quick Add

Ratings

Variants

Badges

---

# **6\. Why Choose Us**

Not Features.

Benefits.

Example

Traditional Brands

❌ Harsh Chemicals

❌ Temporary Results

❌ Generic Ingredients

Your Brand

✔ Clinical Ingredients

✔ Long-Term Results

✔ Dermatologist Approved

✔ Track Record 98%

---

# **7\. Brand Story**

People buy stories.

Not products.

Explain

Mission

Founder

Vision

Why brand exists

One good founder image works better than stock photos.

\#\# Integrate the \<Lanyard /\> component from React Bits

You are helping integrate an open-source React component into an existing application.

\#\#\# Component: Lanyard

\#\#\# Variant: JavaScript \+ CSS

\#\#\# Dependencies: three meshline @react-three/fiber @react-three/drei @react-three/rapier

\---

\#\#\# Usage Example

\`\`\`jsx

import Lanyard from './Lanyard'

\<Lanyard position={\[0, 0, 20\]} gravity={\[0, \-40, 0\]} /\>

// Pass custom images for the card's front/back faces and/or the lanyard band.

// frontImage and backImage render independently; imageFit keeps aspect ratio.

// lanyardWidth widens the band so a custom band image has more room.

\<Lanyard

  position={\[0,0,24\]}

  gravity={\[0,-40,0\]}

  frontImage="/my-front.png"

  backImage="/my-back.png"

  imageFit="cover"

  lanyardImage="/my-band.png"

  lanyardWidth={1}

/\>

/\* IMPORTANT INFO BELOW

1\. You MUST have the card.glb and lanyard.png files in your project and import them

\- these can be downloaded from the repo's files, under src/assets/lanyard

2\. You can edit your card.glb file in this online .glb editor and change the texture:

\- https://modelviewer.dev/editor/

\- alternatively, pass the "frontImage" / "backImage" props to swap the card's faces at runtime

4\. The png file is the texture for the lanyard's band and can be edited in any image editor

5\. Your Vite configuration must be updated to include the following in vite.config.js:

assetsInclude: \['\*\*/\*.glb'\]

6\. For TS users, you might need these changes:

\- src/global.d.ts

export { };

declare module '\*.glb';

declare module '\*.png';

declare module 'meshline' {

  export const MeshLineGeometry: any;

  export const MeshLineMaterial: any;

}

declare global {

  namespace JSX {

    interface IntrinsicElements {

      meshLineGeometry: any;

      meshLineMaterial: any;

    }

  }

}

\- src/vite-env.d.ts

/// \<reference types="vite/client" /\>

declare module '\*.glb';

declare module '\*.png';

\*/

\`\`\`

\#\#\# Props

| Prop | Type | Default | Description |

|------|------|---------|-------------|

| position | array | \[0, 0, 30\] | Initial camera position for the canvas. |

| gravity | array | \[0, \-40, 0\] | Gravity vector for the physics simulation. |

| fov | number | 20 | Camera field of view. |

| transparent | boolean | true | Enables a transparent background for the canvas. |

| frontImage | string | null | Custom image URL for the card's front face. Falls back to the model's built-in texture when not set. |

| backImage | string | null | Custom image URL for the card's back face, rendered independently from the front. |

| imageFit | "cover" | "contain" | "cover" | How a custom front/back image fits its face. Both preserve aspect ratio; 'cover' fills and crops, 'contain' letterboxes. |

| lanyardImage | string | null | Custom image URL for the lanyard band's repeating texture. Falls back to the default band texture when not set. |

| lanyardWidth | number | 1 | Width of the lanyard band (meshline lineWidth). Increase it to give a custom band image more room and reduce stretching. |

\#\#\# Full Component Source

\`\`\`jsx

/\* eslint-disable react/no-unknown-property \*/

'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import { Canvas, extend, useFrame } from '@react-three/fiber';

import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';

import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';

import { MeshLineGeometry, MeshLineMaterial } from 'meshline';

// replace with your own imports, see the usage snippet for details

import cardGLB from './card.glb';

import lanyard from './lanyard.png';

import \* as THREE from 'three';

import './Lanyard.css';

extend({ MeshLineGeometry, MeshLineMaterial });

// 1x1 transparent pixel — lets useTexture be called unconditionally when a

// front/back image isn't supplied.

const BLANK\_PIXEL \=

  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

// The card model's front face is UV-mapped to the LEFT half of the texture

// atlas and the back face to the RIGHT half (measured from card.glb). Each

// custom image is composited into its own half so the two faces render

// independently, aspect-preserving (no stretching).

const FRONT\_UV\_RECT \= { x: 0, y: 0, w: 0.5, h: 0.755 };

const BACK\_UV\_RECT \= { x: 0.5, y: 0, w: 0.5, h: 0.757 };

export default function Lanyard({

  position \= \[0, 0, 30\],

  gravity \= \[0, \-40, 0\],

  fov \= 20,

  transparent \= true,

  frontImage \= null,

  backImage \= null,

  imageFit \= 'cover',

  lanyardImage \= null,

  lanyardWidth \= 1

}) {

  const \[isMobile, setIsMobile\] \= useState(() \=\> typeof window \!== 'undefined' && window.innerWidth \< 768);

  useEffect(() \=\> {

    const handleResize \= () \=\> setIsMobile(window.innerWidth \< 768);

    window.addEventListener('resize', handleResize);

    return () \=\> window.removeEventListener('resize', handleResize);

  }, \[\]);

  return (

    \<div className="lanyard-wrapper"\>

      \<Canvas

        camera={{ position: position, fov: fov }}

        dpr={\[1, isMobile ? 1.5 : 2\]}

        gl={{ alpha: transparent }}

        onCreated={({ gl }) \=\> gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}

      \>

        \<ambientLight intensity={Math.PI} /\>

        \<Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}\>

          \<Band

            isMobile={isMobile}

            frontImage={frontImage}

            backImage={backImage}

            imageFit={imageFit}

            lanyardImage={lanyardImage}

            lanyardWidth={lanyardWidth}

          /\>

        \</Physics\>

        \<Environment blur={0.75}\>

          \<Lightformer

            intensity={2}

            color="white"

            position={\[0, \-1, 5\]}

            rotation={\[0, 0, Math.PI / 3\]}

            scale={\[100, 0.1, 1\]}

          /\>

          \<Lightformer

            intensity={3}

            color="white"

            position={\[-1, \-1, 1\]}

            rotation={\[0, 0, Math.PI / 3\]}

            scale={\[100, 0.1, 1\]}

          /\>

          \<Lightformer

            intensity={3}

            color="white"

            position={\[1, 1, 1\]}

            rotation={\[0, 0, Math.PI / 3\]}

            scale={\[100, 0.1, 1\]}

          /\>

          \<Lightformer

            intensity={10}

            color="white"

            position={\[-10, 0, 14\]}

            rotation={\[0, Math.PI / 2, Math.PI / 3\]}

            scale={\[100, 10, 1\]}

          /\>

        \</Environment\>

      \</Canvas\>

    \</div\>

  );

}

function Band({

  maxSpeed \= 50,

  minSpeed \= 0,

  isMobile \= false,

  frontImage \= null,

  backImage \= null,

  imageFit \= 'cover',

  lanyardImage \= null,

  lanyardWidth \= 1

}) {

  const band \= useRef(),

    fixed \= useRef(),

    j1 \= useRef(),

    j2 \= useRef(),

    j3 \= useRef(),

    card \= useRef();

  const vec \= new THREE.Vector3(),

    ang \= new THREE.Vector3(),

    rot \= new THREE.Vector3(),

    dir \= new THREE.Vector3();

  const segmentProps \= { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 4, linearDamping: 4 };

  const { nodes, materials } \= useGLTF(cardGLB);

  const texture \= useTexture(lanyardImage || lanyard);

  // useTexture must be called unconditionally; use a blank pixel when an image

  // isn't supplied for a given face, then skip compositing it below.

  const frontTex \= useTexture(frontImage || BLANK\_PIXEL);

  const backTex \= useTexture(backImage || BLANK\_PIXEL);

  // Composite the front/back images into the card's texture atlas (front \= left

  // half, back \= right half). Each image is drawn aspect-preserving (no stretch).

  const cardMap \= useMemo(() \=\> {

    const baseMap \= materials.base.map;

    if (\!frontImage && \!backImage) return baseMap;

    const baseImg \= baseMap.image;

    const W \= baseImg.width;

    const H \= baseImg.height;

    const canvas \= document.createElement('canvas');

    canvas.width \= W;

    canvas.height \= H;

    const ctx \= canvas.getContext('2d');

    if (\!ctx) return baseMap;

    // Keep the original baked atlas for the card edges and any untouched face.

    ctx.drawImage(baseImg, 0, 0, W, H);

    const drawFitted \= (img, rect) \=\> {

      const rx \= rect.x \* W;

      const ry \= rect.y \* H;

      const rw \= rect.w \* W;

      const rh \= rect.h \* H;

      const pick \= imageFit \=== 'contain' ? Math.min : Math.max;

      const scale \= pick(rw / img.width, rh / img.height);

      const dw \= img.width \* scale;

      const dh \= img.height \* scale;

      const dx \= rx \+ (rw \- dw) / 2;

      const dy \= ry \+ (rh \- dh) / 2;

      ctx.save();

      ctx.beginPath();

      ctx.rect(rx, ry, rw, rh);

      ctx.clip();

      ctx.drawImage(img, dx, dy, dw, dh);

      ctx.restore();

    };

    if (frontImage && frontTex.image) drawFitted(frontTex.image, FRONT\_UV\_RECT);

    if (backImage && backTex.image) drawFitted(backTex.image, BACK\_UV\_RECT);

    const composite \= new THREE.CanvasTexture(canvas);

    composite.colorSpace \= THREE.SRGBColorSpace;

    composite.flipY \= baseMap.flipY;

    composite.anisotropy \= 16;

    composite.needsUpdate \= true;

    return composite;

  }, \[frontImage, backImage, imageFit, frontTex, backTex, materials.base.map\]);

  const \[curve\] \= useState(

    () \=\>

      new THREE.CatmullRomCurve3(\[new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()\])

  );

  const \[dragged, drag\] \= useState(false);

  const \[hovered, hover\] \= useState(false);

  useRopeJoint(fixed, j1, \[\[0, 0, 0\], \[0, 0, 0\], 1\]);

  useRopeJoint(j1, j2, \[\[0, 0, 0\], \[0, 0, 0\], 1\]);

  useRopeJoint(j2, j3, \[\[0, 0, 0\], \[0, 0, 0\], 1\]);

  useSphericalJoint(j3, card, \[

    \[0, 0, 0\],

    \[0, 1.5, 0\]

  \]);

  useEffect(() \=\> {

    if (hovered) {

      document.body.style.cursor \= dragged ? 'grabbing' : 'grab';

      return () \=\> void (document.body.style.cursor \= 'auto');

    }

  }, \[hovered, dragged\]);

  useFrame((state, delta) \=\> {

    if (dragged) {

      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);

      dir.copy(vec).sub(state.camera.position).normalize();

      vec.add(dir.multiplyScalar(state.camera.position.length()));

      \[card, j1, j2, j3, fixed\].forEach(ref \=\> ref.current?.wakeUp());

      card.current?.setNextKinematicTranslation({ x: vec.x \- dragged.x, y: vec.y \- dragged.y, z: vec.z \- dragged.z });

    }

    if (fixed.current) {

      \[j1, j2\].forEach(ref \=\> {

        if (\!ref.current.lerped) ref.current.lerped \= new THREE.Vector3().copy(ref.current.translation());

        const clampedDistance \= Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));

        ref.current.lerped.lerp(

          ref.current.translation(),

          delta \* (minSpeed \+ clampedDistance \* (maxSpeed \- minSpeed))

        );

      });

      curve.points\[0\].copy(j3.current.translation());

      curve.points\[1\].copy(j2.current.lerped);

      curve.points\[2\].copy(j1.current.lerped);

      curve.points\[3\].copy(fixed.current.translation());

      band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));

      ang.copy(card.current.angvel());

      rot.copy(card.current.rotation());

      card.current.setAngvel({ x: ang.x, y: ang.y \- rot.y \* 0.25, z: ang.z });

    }

  });

  curve.curveType \= 'chordal';

  texture.wrapS \= texture.wrapT \= THREE.RepeatWrapping;

  return (

    \<\>

      \<group position={\[0, 4, 0\]}\>

        \<RigidBody ref={fixed} {...segmentProps} type="fixed" /\>

        \<RigidBody position={\[0.5, 0, 0\]} ref={j1} {...segmentProps}\>

          \<BallCollider args={\[0.1\]} /\>

        \</RigidBody\>

        \<RigidBody position={\[1, 0, 0\]} ref={j2} {...segmentProps}\>

          \<BallCollider args={\[0.1\]} /\>

        \</RigidBody\>

        \<RigidBody position={\[1.5, 0, 0\]} ref={j3} {...segmentProps}\>

          \<BallCollider args={\[0.1\]} /\>

        \</RigidBody\>

        \<RigidBody position={\[2, 0, 0\]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}\>

          \<CuboidCollider args={\[0.8, 1.125, 0.01\]} /\>

          \<group

            scale={2.25}

            position={\[0, \-1.2, \-0.05\]}

            onPointerOver={() \=\> hover(true)}

            onPointerOut={() \=\> hover(false)}

            onPointerUp={e \=\> (e.target.releasePointerCapture(e.pointerId), drag(false))}

            onPointerDown={e \=\> (

              e.target.setPointerCapture(e.pointerId),

              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())))

            )}

          \>

            \<mesh geometry={nodes.card.geometry}\>

              \<meshPhysicalMaterial

                map={cardMap}

                map-anisotropy={16}

                clearcoat={isMobile ? 0 : 1}

                clearcoatRoughness={0.15}

                roughness={0.9}

                metalness={0.8}

              /\>

            \</mesh\>

            \<mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} /\>

            \<mesh geometry={nodes.clamp.geometry} material={materials.metal} /\>

          \</group\>

        \</RigidBody\>

      \</group\>

      \<mesh ref={band}\>

        \<meshLineGeometry /\>

        \<meshLineMaterial

          color="white"

          depthTest={false}

          resolution={isMobile ? \[1000, 2000\] : \[1000, 1000\]}

          useMap

          map={texture}

          repeat={\[-4, 1\]}

          lineWidth={lanyardWidth}

        /\>

      \</mesh\>

    \</\>

  );

}

\`\`\`

\#\#\# Component CSS

\`\`\`css

.lanyard-wrapper {

  position: relative;

  z-index: 0;

  width: 100%;

  height: 100vh;

  display: flex;

  justify-content: center;

  align-items: center;

  transform: scale(1);

  transform-origin: center;

}

\`\`\`

\#\#\# Integration Instructions

1\. Install any listed dependencies.

2\. Copy the component source into the appropriate directory in the project.

3\. Import the CSS file alongside the component.

4\. Import and render the component using the usage example above as a starting point.

5\. Adjust props as needed for the specific use case — refer to the props table for all available options.

Use this while You create the founder photo picture kind of thing, but remember that within that section, for the subsection that you are going to be creating for the founder, you should use this and their pictures as well. I will be giving you pictures as well of the founder on this card kind of thing. That's what my concern is: on both sides, two pictures should be one and second, and the exact same kind of animation should be over there in the section that you are going to be creating for the brand story kind of thing.

---

# **8\. Product Benefits**

Every benefit should answer

"So what?"

Example

Niacinamide

↓

Reduces Acne

↓

Less Marks

↓

Better Confidence

↓

Look Better

Never stop at ingredients.

---

# **9\. Video Demonstration**

Premium cinematic video.

15–45 seconds.

Show

Application

Texture

Packaging

Lifestyle

Transformation

---

# **10\. Customer Results**

Before

After

Videos

Images

Testimonials

UGC

Numbers

---

# **11\. Reviews**

Real reviews.

Images

Videos

Names

Verified badge

Skin type

Age

Location

---

# **12\. Trust & Authority**

Certificates

Awards

Lab Reports

FDA

ISO

GMP

Clinically Tested

Media Mentions

Use this as reference while building this section: You are given a task to integrate an existing React component in the codebase

The codebase should support:

\- shadcn project structure  

\- Tailwind CSS

\- Typescript

If it doesn't, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.

Determine the default path for components and styles. 

If default path for components is not /components/ui, provide instructions on why it's important to create this folder

Copy-paste this component to /components/ui folder:

\`\`\`tsx

card-stack.tsx

"use client";

import \* as React from "react";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

import { SquareArrowOutUpRight } from "lucide-react";

import Link from "next/link";

function cn(...classes: Array\<string | undefined | null | false\>) {

  return classes.filter(Boolean).join(" ");

}

export type CardStackItem \= {

  id: string | number;

  title: string;

  description?: string;

  imageSrc?: string;

  href?: string;

  ctaLabel?: string;

  tag?: string;

};

export type CardStackProps\<T extends CardStackItem\> \= {

  items: T\[\];

  /\*\* Selected index on mount \*/

  initialIndex?: number;

  /\*\* How many cards are visible around the active (odd recommended) \*/

  maxVisible?: number;

  /\*\* Card sizing \*/

  cardWidth?: number;

  cardHeight?: number;

  /\*\* How much cards overlap each other (0..0.8). Higher \= more overlap \*/

  overlap?: number;

  /\*\* Total fan angle (deg). Higher \= wider arc \*/

  spreadDeg?: number;

  /\*\* 3D / depth feel \*/

  perspectivePx?: number;

  depthPx?: number;

  tiltXDeg?: number;

  /\*\* Active emphasis \*/

  activeLiftPx?: number;

  activeScale?: number;

  inactiveScale?: number;

  /\*\* Motion \*/

  springStiffness?: number;

  springDamping?: number;

  /\*\* Behavior \*/

  loop?: boolean;

  autoAdvance?: boolean;

  intervalMs?: number;

  pauseOnHover?: boolean;

  /\*\* UI \*/

  showDots?: boolean;

  className?: string;

  /\*\* Hooks \*/

  onChangeIndex?: (index: number, item: T) \=\> void;

  /\*\* Custom renderer (optional) \*/

  renderCard?: (item: T, state: { active: boolean }) \=\> React.ReactNode;

};

function wrapIndex(n: number, len: number) {

  if (len \<= 0\) return 0;

  return ((n % len) \+ len) % len;

}

/\*\* Minimal signed offset from active index to i, with wrapping (for loop behavior). \*/

function signedOffset(i: number, active: number, len: number, loop: boolean) {

  const raw \= i \- active;

  if (\!loop || len \<= 1\) return raw;

  // consider wrapped alternative

  const alt \= raw \> 0 ? raw \- len : raw \+ len;

  return Math.abs(alt) \< Math.abs(raw) ? alt : raw;

}

export function CardStack\<T extends CardStackItem\>({

  items,

  initialIndex \= 0,

  maxVisible \= 7,

  cardWidth \= 520,

  cardHeight \= 320,

  overlap \= 0.48,

  spreadDeg \= 48,

  perspectivePx \= 1100,

  depthPx \= 140,

  tiltXDeg \= 12,

  activeLiftPx \= 22,

  activeScale \= 1.03,

  inactiveScale \= 0.94,

  springStiffness \= 280,

  springDamping \= 28,

  loop \= true,

  autoAdvance \= false,

  intervalMs \= 2800,

  pauseOnHover \= true,

  showDots \= true,

  className,

  onChangeIndex,

  renderCard,

}: CardStackProps\<T\>) {

  const reduceMotion \= useReducedMotion();

  const len \= items.length;

  const \[active, setActive\] \= React.useState(() \=\>

    wrapIndex(initialIndex, len),

  );

  const \[hovering, setHovering\] \= React.useState(false);

  // keep active in bounds if items change

  React.useEffect(() \=\> {

    setActive((a) \=\> wrapIndex(a, len));

  }, \[len\]);

  React.useEffect(() \=\> {

    if (\!len) return;

    onChangeIndex?.(active, items\[active\]\!);

    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, \[active\]);

  const maxOffset \= Math.max(0, Math.floor(maxVisible / 2));

  const cardSpacing \= Math.max(10, Math.round(cardWidth \* (1 \- overlap)));

  const stepDeg \= maxOffset \> 0 ? spreadDeg / maxOffset : 0;

  const canGoPrev \= loop || active \> 0;

  const canGoNext \= loop || active \< len \- 1;

  const prev \= React.useCallback(() \=\> {

    if (\!len) return;

    if (\!canGoPrev) return;

    setActive((a) \=\> wrapIndex(a \- 1, len));

  }, \[canGoPrev, len\]);

  const next \= React.useCallback(() \=\> {

    if (\!len) return;

    if (\!canGoNext) return;

    setActive((a) \=\> wrapIndex(a \+ 1, len));

  }, \[canGoNext, len\]);

  // keyboard navigation (when container focused)

  const onKeyDown \= (e: React.KeyboardEvent) \=\> {

    if (e.key \=== "ArrowLeft") prev();

    if (e.key \=== "ArrowRight") next();

  };

  // autoplay

  React.useEffect(() \=\> {

    if (\!autoAdvance) return;

    if (reduceMotion) return;

    if (\!len) return;

    if (pauseOnHover && hovering) return;

    const id \= window.setInterval(

      () \=\> {

        if (loop || active \< len \- 1\) next();

      },

      Math.max(700, intervalMs),

    );

    return () \=\> window.clearInterval(id);

  }, \[

    autoAdvance,

    intervalMs,

    hovering,

    pauseOnHover,

    reduceMotion,

    len,

    loop,

    active,

    next,

  \]);

  if (\!len) return null;

  const activeItem \= items\[active\]\!;

  return (

    \<div

      className={cn("w-full", className)}

      onMouseEnter={() \=\> setHovering(true)}

      onMouseLeave={() \=\> setHovering(false)}

    \>

      {/\* Stage \*/}

      \<div

        className="relative w-full"

        style={{ height: Math.max(380, cardHeight \+ 80\) }}

        tabIndex={0}

        onKeyDown={onKeyDown}

      \>

        {/\* background wash / spotlight (unique feel) \*/}

        \<div

          className="pointer-events-none absolute inset-x-0 top-6 mx-auto h-48 w-\[70%\] rounded-full bg-black/5 blur-3xl dark:bg-white/5"

          aria-hidden="true"

        /\>

        \<div

          className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-40 w-\[76%\] rounded-full bg-black/10 blur-3xl dark:bg-black/30"

          aria-hidden="true"

        /\>

        \<div

          className="absolute inset-0 flex items-end justify-center"

          style={{

            perspective: \`${perspectivePx}px\`,

          }}

        \>

          \<AnimatePresence initial={false}\>

            {items.map((item, i) \=\> {

              const off \= signedOffset(i, active, len, loop);

              const abs \= Math.abs(off);

              const visible \= abs \<= maxOffset;

              // hide far-away cards cleanly

              if (\!visible) return null;

              // fan geometry

              const rotateZ \= off \* stepDeg;

              const x \= off \* cardSpacing;

              const y \= abs \* 10; // subtle arc-down feel

              const z \= \-abs \* depthPx;

              const isActive \= off \=== 0;

              const scale \= isActive ? activeScale : inactiveScale;

              const lift \= isActive ? \-activeLiftPx : 0;

              const rotateX \= isActive ? 0 : tiltXDeg;

              const zIndex \= 100 \- abs;

              // drag only on the active card

              const dragProps \= isActive

                ? {

                    drag: "x" as const,

                    dragConstraints: { left: 0, right: 0 },

                    dragElastic: 0.18,

                    onDragEnd: (

                      \_e: any,

                      info: { offset: { x: number }; velocity: { x: number } },

                    ) \=\> {

                      if (reduceMotion) return;

                      const travel \= info.offset.x;

                      const v \= info.velocity.x;

                      const threshold \= Math.min(160, cardWidth \* 0.22);

                      // swipe logic

                      if (travel \> threshold || v \> 650\) prev();

                      else if (travel \< \-threshold || v \< \-650) next();

                    },

                  }

                : {};

              return (

                \<motion.div

                  key={item.id}

                  className={cn(

                    "absolute bottom-0 rounded-2xl border-4 border-black/10 dark:border-white/10 overflow-hidden shadow-xl",

                    "will-change-transform select-none",

                    isActive

                      ? "cursor-grab active:cursor-grabbing"

                      : "cursor-pointer",

                  )}

                  style={{

                    width: cardWidth,

                    height: cardHeight,

                    zIndex,

                    transformStyle: "preserve-3d",

                  }}

                  initial={

                    reduceMotion

                      ? false

                      : {

                          opacity: 0,

                          y: y \+ 40,

                          x,

                          rotateZ,

                          rotateX,

                          scale,

                        }

                  }

                  animate={{

                    opacity: 1,

                    x,

                    y: y \+ lift,

                    rotateZ,

                    rotateX,

                    // framer doesn't support translateZ directly in animate on all setups,

                    // so we use a custom transform via style below.

                    scale,

                  }}

                  transition={{

                    type: "spring",

                    stiffness: springStiffness,

                    damping: springDamping,

                  }}

                  // translateZ via style transform (kept stable w/ motion values above)

                  // We apply translateZ by using a CSS transform in a child wrapper.

                  onClick={() \=\> setActive(i)}

                  {...dragProps}

                \>

                  \<div

                    className="h-full w-full"

                    style={{

                      transform: \`translateZ(${z}px)\`,

                      transformStyle: "preserve-3d",

                    }}

                  \>

                    {renderCard ? (

                      renderCard(item, { active: isActive })

                    ) : (

                      \<DefaultFanCard item={item} active={isActive} /\>

                    )}

                  \</div\>

                \</motion.div\>

              );

            })}

          \</AnimatePresence\>

        \</div\>

      \</div\>

      {/\* Dots navigation centered at bottom \*/}

      {showDots ? (

        \<div className="mt-6 flex items-center justify-center gap-3"\>

          \<div className="flex items-center gap-2"\>

            {items.map((it, idx) \=\> {

              const on \= idx \=== active;

              return (

                \<button

                  key={it.id}

                  onClick={() \=\> setActive(idx)}

                  className={cn(

                    "h-2 w-2 rounded-full transition",

                    on

                      ? "bg-foreground"

                      : "bg-foreground/30 hover:bg-foreground/50",

                  )}

                  aria-label={\`Go to ${it.title}\`}

                /\>

              );

            })}

          \</div\>

          {activeItem.href ? (

            \<Link

              href={activeItem.href}

              target="\_blank"

              rel="noreferrer"

              className="text-muted-foreground hover:text-foreground transition"

              aria-label="Open link"

            \>

              \<SquareArrowOutUpRight className="h-4 w-4" /\>

            \</Link\>

          ) : null}

        \</div\>

      ) : null}

    \</div\>

  );

}

function DefaultFanCard({ item }: { item: CardStackItem; active: boolean }) {

  return (

    \<div className="relative h-full w-full"\>

      {/\* image \*/}

      \<div className="absolute inset-0"\>

        {item.imageSrc ? (

          \<img

            src={item.imageSrc}

            alt={item.title}

            className="h-full w-full object-cover"

            draggable={false}

            loading="eager"

          /\>

        ) : (

          \<div className="flex h-full w-full items-center justify-center bg-secondary text-sm text-muted-foreground"\>

            No image

          \</div\>

        )}

      \</div\>

      {/\* subtle gradient overlay at bottom for text readability \*/}

      \<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" /\>

      {/\* content \*/}

      \<div className="relative z-10 flex h-full flex-col justify-end p-5"\>

        \<div className="truncate text-lg font-semibold text-white"\>

          {item.title}

        \</div\>

        {item.description ? (

          \<div className="mt-1 line-clamp-2 text-sm text-white/80"\>

            {item.description}

          \</div\>

        ) : null}

      \</div\>

    \</div\>

  );

}

demo.tsx

"use client";

import { CardStack, CardStackItem } from "@/components/ui/card-stack";

const items: CardStackItem\[\] \= \[

  {

    id: 1,

    title: "Luxury Performance",

    description: "Experience the thrill of precision engineering",

    imageSrc: "https://i.pinimg.com/736x/e7/cf/cb/e7cfcbd7a8af10b8839c8d9a3d8eb4ce.jpg",

    href: "https://www.ruixen.com/",

  },

  {

    id: 2,

    title: "Elegant Design",

    description: "Where beauty meets functionality",

    imageSrc: "https://i.pinimg.com/736x/f4/b0/00/f4b000a6880f7e8d0c677812d789e001.jpg",

    href: "https://www.ruixen.com/",

  },

  {

    id: 3,

    title: "Power & Speed",

    description: "Unleash the true potential of the road",

    imageSrc: "https://i.pinimg.com/1200x/ae/cf/d7/aecfd72b2439914647ec06d19cb182b5.jpg",

    href: "https://www.ruixen.com/",

  },

  {

    id: 4,

    title: "Timeless Craftsmanship",

    description: "Built with passion, driven by excellence",

    imageSrc: "https://i.pinimg.com/736x/5d/f7/69/5df7696c4f24b7961c8c72748a355ff8.jpg",

    href: "https://www.ruixen.com/",

  },

  {

    id: 5,

    title: "Future of Mobility",

    description: "Innovation that moves you forward",

    imageSrc: "https://i.pinimg.com/736x/9c/f2/8b/9cf28b4df4e06e0ca34fbe87f25734b6.jpg",

    href: "https://www.ruixen.com/",

  },

\];

export default function CardStackDemoPage() {

  return (

    \<div className="w-full"\>

      \<div className="mx-auto w-full max-w-5xl p-8"\>

        \<CardStack

          items={items}

          initialIndex={0}

          autoAdvance

          intervalMs={2000}

          pauseOnHover

          showDots

        /\>

      \</div\>

    \</div\>

  );

}

\`\`\`

Install NPM dependencies:

\`\`\`bash

next, lucide-react, framer-motion

\`\`\`

Implementation Guidelines

 1\. Analyze the component structure and identify all required dependencies

 2\. Review the component's argumens and state

 3\. Identify any required context providers or hooks and install them

 4\. Questions to Ask

 \- What data/props will be passed to this component?

 \- Are there any specific state management requirements?

 \- Are there any required assets (images, icons, etc.)?

 \- What is the expected responsive behavior?

 \- What is the best place to use this component in the app?

Steps to integrate

 0\. Copy paste all the code above in the correct directories

 1\. Install external dependencies

 2\. Fill image assets with Unsplash stock images you know exist

 3\. Use lucide-react icons for svgs or logos if component requires them

---

# **13\. Product Comparison**

Example

| Feature | Your Brand | Others |
| ----- | ----- | ----- |
| Natural Ingredients | ✅ | ❌ |
| Cruelty Free | ✅ | ❌ |
| Dermatologist Tested | ✅ | ❌ |
| Money Back | ✅ | ❌  |

---

# **14\. Ingredient Breakdown**

Interactive cards.

Ingredient

Purpose

Research

Benefits

Animation

---

# **15\. How It Works**

Step 1

Clean Face

↓

Step 2

Apply Serum

↓

Step 3

Use Moisturizer

↓

Step 4

Glow

---

# **16\. Lifestyle Gallery**

Instagram style.

Videos.

Images.

Real customers.

Not studio only.

---

# **17\. FAQ**

Answer objections.

Is it safe?

Sensitive skin?

Pregnancy?

Returns?

Shipping?

Delivery?

---

# **18\. Guarantee**

Money Back

Return Policy

Secure Checkout

COD

Free Shipping

---

# **19\. Newsletter**

Don't say

"Subscribe."

Instead

Get 10% Off

Exclusive Drops

Early Access

Skin Guide PDF

---

# **20\. Final CTA**

Repeat Hero

Headline

CTA

Trust

Nothing new.

---

# **21\. Footer**

Policies

Contact

WhatsApp

Instagram

Terms

Privacy

Shipping

Refund

About

Collections

---

# **Hidden Conversion Sections**

These don't always appear as visible blocks, but they dramatically increase conversion.

## **Sticky Header**

Shop Now

Search

Cart

---

## **Sticky Add To Cart**

Always visible on mobile.

---

## **Progress Bar**

Spend ₹500 more

Get Free Shipping

---

## **Recently Viewed**

Personalization.

---

## **Bundle Offers**

Frequently Bought Together

---

## **Cart Drawer**

Without leaving page.

---

## **Exit Intent**

Wait\!

Get 10% Off

---

## **Live Sales Notification**

Only if genuine.

Don't fake.

---

## **Wishlist**

---

## **Smart Search**

Image Search

AI Search

Autocomplete

---

## **Recently Purchased**

Again, only if real.

---

# **Homepage Psychology Flow**

Attention

↓

Interest

↓

Desire

↓

Trust

↓

Authority

↓

Proof

↓

Benefits

↓

Comparison

↓

Education

↓

Testimonials

↓

Guarantee

↓

Offer

↓

Urgency

↓

Purchase  
---

# **What World's Best D2C Brands Do**

## **Apple**

Minimal copy

Huge visuals

Premium whitespace

Emotion

---

## **Gymshark**

Community first

Lifestyle

Identity

Strong imagery

---

## **Glossier**

UGC everywhere

Real customers

Friendly language

---

## **Allbirds**

Mission

Sustainability

Simple messaging

---

## **Caraway**

Premium photography

Education

Comparison

Benefits

---

## **Ridge**

Problem

Solution

Social proof

Offer

Strong guarantees

---

## **Huel**

Data

Nutrition

Trust

Science

---

## **Lululemon**

Lifestyle

Aspirational identity

Community

---

## **Rothy's**

Sustainability

Craftsmanship

Transparency

---

## **Who Gives A Crap**

Humor

Storytelling

Mission-driven copy

---

# **Premium UI Details**

A $1,000 site should also *feel* premium through interaction design, not just visuals.

* Smooth page transitions (fade/slide)  
* Subtle scroll-triggered animations  
* Glassmorphism only where it enhances readability  
* Generous whitespace (avoid crowded layouts)  
* Large, editorial typography with clear hierarchy  
* High-quality lifestyle photography mixed with clean product renders  
* Micro-interactions on buttons, cards, and navigation  
* Sticky navigation that shrinks on scroll  
* Mobile-first design (70–90% of D2C traffic is mobile)  
* Fast loading (target Core Web Vitals)  
* Accessible color contrast and readable font sizes  
* Remember one thing more: this is the primary thing that you need to understand. That is, every section that you are going to be creating should be mobile, tablet, and desktop friendly. That's the primary key that you need to understand.  
* Both features should be over there: dark mode as well as simple mode. Both modes should be over there for the website(Option should be in header).  
* 

---

# **The Formula Used by High-Converting Stores**

Every section should answer **one** question before moving to the next.

1. **Who are you?**  
2. **Why should I care?**  
3. **Can I trust you?**  
4. **What exactly are you selling?**  
5. **Why is it better than alternatives?**  
6. **Will it solve my problem?**  
7. **Can you prove it?**  
8. **Is there any risk?**  
9. **Why should I buy today?**  
10. **How do I get started?**

If every homepage section has a single purpose and follows this sequence, you end up with a homepage that doesn't just look premium—it systematically reduces doubt and increases the likelihood that visitors move toward a purchase. This structure works well with a **custom-coded frontend \+ Shopify backend**, where you can optimize animations, performance, and interactions without sacrificing Shopify's commerce capabilities.

# **MASTER WEBSITE DESIGN SYSTEM PROMPT**

**Act as the Creative Director of Apple, Rhode, Aesop, and Linear combined.**

Design a complete visual design system for a **$10,000+ custom-coded Shopify skincare website** called **Only Skincare**.

The website should immediately feel like a global luxury brand. Every design decision should communicate **premium quality, trust, elegance, science, and simplicity.**

Do **NOT** create a typical Shopify store. Create a luxury digital experience.

The style should combine:

* Apple's premium minimalism  
* Rhode's soft beauty aesthetic  
* Aesop's editorial elegance  
* Glossier's friendliness  
* COS's whitespace  
* Linear's precision  
* Framer's interactions  
* Stripe's polish

Everything must feel handcrafted.

---

# **Overall Design Philosophy**

The website should feel like entering an Apple Store—not a supermarket.

Every section should breathe.

Use large whitespace.

Never overcrowd content.

Every animation should feel intentional.

Everything should communicate trust.

The customer should subconsciously feel that the products are worth paying more for.

---

# **Visual Keywords**

Premium

Luxury

Minimal

Editorial

Scientific

Organic

Calm

Sophisticated

Modern

Elegant

Human

Natural

Timeless

Soft

Refined

---

# **Color Palette**

## **Primary Brand**

Forest Green

\#0F5D52

Deep Emerald

\#145A4A  
---

## **Secondary**

Soft Sage

\#BFD5C6

Mint Mist

\#EAF5EF

Light Botanical

\#DCEEE4  
---

## **Background**

Warm White

\#FAFAF7

Premium Ivory

\#F7F5F1

Soft Cream

\#F2EFE9

Pure White

\#FFFFFF  
---

## **Text**

Premium Black

\#171717

Charcoal

\#2A2A2A

Soft Gray

\#676767

Light Gray

\#B4B4B4  
---

## **Accent**

Champagne Gold

\#D4B06A

Luxury Bronze

\#B98A44

Warm Sand

\#D8C8A8

Use accent colors very sparingly.

95% of the website should use neutral colors.

---

# **Color Distribution**

60%

Warm White

30%

Forest Green

10%

Champagne Gold

---

# **Border Colors**

rgba(20,20,20,0.08)

Hover

rgba(20,20,20,0.14)  
---

# **Shadows**

Cards

0 20px 60px rgba(0,0,0,.08)

Hover

0 30px 80px rgba(0,0,0,.12)

Buttons

0 8px 25px rgba(15,93,82,.25)

Never use harsh shadows.

---

# **Liquid Glass System**

Use Apple's Liquid Glass design language.

Not futuristic.

Not neon.

Not cyberpunk.

Elegant.

Luxury.

Natural.

Use Liquid Glass ONLY on

Navigation

Mega Menu

Search

Cart Drawer

Product Quick View

Floating CTA

Testimonials Cards

Newsletter Card

Floating Review Badge

Sticky Add To Cart

---

Glass Background

rgba(255,255,255,0.18)

Dark Glass

rgba(18,18,18,0.14)

Backdrop Blur

blur(28px)

Glass Border

rgba(255,255,255,.35)

Reflection

rgba(255,255,255,.45)

Shadow

0 18px 50px rgba(0,0,0,.12)

Radius

28px  
---

# **Corner Radius**

Buttons

999px

Cards

24px

Inputs

20px

Sections

40px

Images

28px

Product Cards

32px

---

# **Typography**

Headings

Large

Bold

Elegant

Editorial

Body

Minimal

Readable

Soft

Spacing

Generous

Never compress content.

---

# **Layout**

12-column grid

Maximum width

1440px

Content width

1240px

Large margins

Large spacing

Perfect alignment

Everything should snap perfectly to the grid.

---

# **Section Spacing**

Desktop

140px

Tablet

100px

Mobile

72px

---

# **Animations**

Smooth

Elegant

Luxury

Duration

300–500ms

Use

Fade

Parallax

Scale

Reveal

Image Zoom

Text Reveal

Magnetic Buttons

Smooth Hover

Never use bouncy animations.

---

# **Product Cards**

Floating

Soft Shadow

Glass Hover

Large Image

Rounded

Minimal Details

Elegant Typography

Quick Add

Hover Image

Premium Badge

---

# **Buttons**

Rounded

Premium

Large

Breathing Space

Hover Lift

Scale

Shadow

Soft Ripple

---

# **Icons**

Outline

Minimal

2px stroke

Rounded

Consistent

Never colorful.

---

# **Photography**

Natural Light

Editorial

Real People

Premium Packaging

Water

Stone

Glass

Soft Fabric

Minimal Props

Healthy Skin

Macro Photography

---

# **Textures**

Stone

Water

Linen

Glass

Natural Light

Soft Reflection

Marble

Matte Paper

Frosted Glass

---

# **Content Layout**

Hero

↓

Social Proof

↓

Best Sellers

↓

Brand Story

↓

Benefits

↓

Science

↓

Ingredients

↓

How It Works

↓

Customer Results

↓

Testimonials

↓

Comparison

↓

FAQ

↓

Guarantee

↓

Newsletter

↓

Footer

Every section should have a single purpose and naturally guide the visitor from curiosity to confidence to purchase.

---

# **User Experience**

Every interaction should feel calm, premium, and frictionless. Avoid visual clutter, excessive gradients, bright colors, and unnecessary motion. Prioritize readability, whitespace, hierarchy, and trust. The final experience should make users feel they are browsing a luxury skincare brand rather than a typical e-commerce store.

**Goal:** Create a design system that looks like it belongs to a brand generating **$100M+ in annual revenue**, with the polish, consistency, and restraint expected from world-class D2C companies.

