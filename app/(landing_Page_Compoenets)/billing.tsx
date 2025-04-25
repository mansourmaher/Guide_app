"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Radio, RadioGroup } from "@headlessui/react";
import { Check, X, Globe, MapPin, Sparkles, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const frequencies = [
  { value: "monthly", label: "Monthly" },
  { value: "annually", label: "Annually" },
];

export const tiers = [
  {
    name: "Starter",
    id: "tier-starter",
    featured: false,
    description: "Get started with basic listing features",
    price: { monthly: "$15", annually: "$144" },
    mainFeatures: [
      "✔️ **5 active tour listings**",
      "✔️ Basic guide profile",
      "✔️ Appears in local searches",
      "✔️ Email support (48h response)",
      "❌ No priority placement",
      "❌ Limited visibility",
    ],
    // USP: Entry-level, low-cost option
    valueProposition: "Ideal for new guides testing the platform",
  },
  {
    name: "Professional",
    id: "tier-professional",
    featured: true, // Highlighted as "Recommended"
    description: "Boost bookings with better visibility & tools",
    price: { monthly: "$60", annually: "$576" },
    mainFeatures: [
      "✔️ **20 active tour listings**",
      "✔️ **Featured in search results** (Higher ranking)",
      "✔️ Regional coverage (wider reach)",
      "✔️ Priority support (24h response)",
      "✔️ Booking analytics dashboard",
      "✔️ Promotional tools (social sharing, discounts)",
      "❌ No VIP placement",
    ],
    // USP: Best value for growing guides
    valueProposition:
      "Maximize bookings with enhanced visibility & marketing tools",
  },
  {
    name: "Premium",
    id: "tier-premium",
    featured: false,
    description: "Dominate search results with top-tier perks",
    price: { monthly: "$30", annually: "$288" },
    mainFeatures: [
      "✔️ **Unlimited tour listings**",
      "✔️ **VIP placement** (Always appears first in searches)",
      "✔️ Global coverage (list in multiple regions)",
      "✔️ 24/7 dedicated support",
      "✔️ Advanced analytics (revenue tracking, trends)",
      "✔️ Exclusive marketing toolkit (SEO boost, ads credits)",
    ],
    // USP: Best for established, high-volume guides
    valueProposition:
      "For elite guides who want maximum exposure & premium features",
  },
];

const sections = [
  {
    name: "Guide Features",
    features: [
      {
        name: "Tour Listings",
        tiers: { Explorer: "5", Adventurer: "20", Pioneer: "Unlimited" },
      },
      {
        name: "Coverage Area",
        tiers: { Explorer: "Local", Adventurer: "Regional", Pioneer: "Global" },
      },
      {
        name: "Profile Badge",
        tiers: { Explorer: false, Adventurer: "⭐", Pioneer: "✨" },
      },
      {
        name: "Promotional Tools",
        tiers: { Explorer: false, Adventurer: true, Pioneer: true },
      },
    ],
  },
  {
    name: "Support & Growth",
    features: [
      {
        name: "Priority Support",
        tiers: { Explorer: false, Adventurer: true, Pioneer: true },
      },
      {
        name: "Analytics Dashboard",
        tiers: {
          Explorer: "Basic",
          Adventurer: "Standard",
          Pioneer: "Advanced",
        },
      },
      {
        name: "Marketing Resources",
        tiers: { Explorer: false, Adventurer: true, Pioneer: true },
      },
      {
        name: "Exclusive Workshops",
        tiers: { Explorer: false, Adventurer: true, Pioneer: true },
      },
    ],
  },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Billing() {
  const [frequency, setFrequency] = useState(frequencies[0]);

  const handelGetStarted = async (
    trierName: string,
    price: string,
    duration: string
  ) => {
    console.log("Trier Name:", trierName);
    console.log("Price:", price);
    console.log("Duration:", duration);
    try {
      await fetch("http://localhost:4000/stripe/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tier: trierName,
          frequency: price,
          duration: duration,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.url) {
            window.location.href = data.url;
          } else {
            console.error("Failed to create checkout session");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <section id="pricing">
      <div className="relative mb-8 ">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.15)_1px,transparent_0)] [background-size:20px_20px] dark:opacity-20"></div>
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-200 dark:bg-blue-800 opacity-40 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 20, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-blue-300 dark:bg-blue-700 opacity-30 blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -30, 0],
              y: [0, 40, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full bg-blue-200 dark:bg-blue-800 opacity-40 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 20, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/2 right-1/2 w-64 h-64 rounded-full bg-blue-200 dark:bg-blue-800 opacity-40 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 20, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1 right-1 w-80 h-80 rounded-full bg-blue-300 dark:bg-blue-700 opacity-30 blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -30, 0],
              y: [0, 40, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
          <motion.div
            className="absolute top-1 left-1 w-80 h-80 rounded-full bg-blue-300 dark:bg-blue-700 opacity-30 blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -30, 0],
              y: [0, 40, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flow-root  sm:pt-32 lg:pb-0"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="relative z-10">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mx-auto max-w-4xl text-center text-5xl font-bold tracking-tight text-gray-900"
              >
                Grow Your Guide Business
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mx-auto mt-4 max-w-2xl text-center text-lg leading-8 text-gray-600"
              >
                Choose the plan that matches your ambitions and start sharing
                your local expertise with travelers worldwide.
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-16 flex justify-center"
              >
                <RadioGroup
                  value={frequency}
                  onChange={setFrequency}
                  className="grid grid-cols-2 gap-x-1 rounded-full bg-white p-1 text-center text-sm font-semibold leading-5 shadow-sm ring-1 ring-inset ring-gray-200"
                >
                  {frequencies.map((option) => (
                    <Radio
                      key={option.value}
                      value={option}
                      className={({ checked }) =>
                        classNames(
                          checked
                            ? "bg-blue-600 text-white"
                            : "text-gray-600 hover:bg-blue-50",
                          "cursor-pointer rounded-full px-3 py-2 transition-colors"
                        )
                      }
                    >
                      {option.label}
                    </Radio>
                  ))}
                </RadioGroup>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="relative mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:-mb-14 lg:max-w-none lg:grid-cols-3"
            >
              {tiers.map((tier) => (
                <motion.div
                  key={tier.id}
                  whileHover={{ y: -5 }}
                  className={classNames(
                    tier.featured
                      ? "ring-2 ring-blue-600 shadow-xl"
                      : "ring-1 ring-gray-200",
                    "relative rounded-2xl bg-white p-8 shadow-sm transition-all"
                  )}
                >
                  <div className="p-6 lg:pt-8 xl:p-8 xl:pt-10">
                    <h3
                      id={tier.id}
                      className={classNames(
                        tier.featured ? "text-blue-600" : "text-gray-900",
                        "text-2xl font-bold tracking-tight"
                      )}
                    >
                      {tier.name}
                    </h3>
                    <p className="mt-4 text-sm text-gray-600">
                      {tier.description}
                    </p>
                    <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between lg:flex-col lg:items-stretch">
                      <div className="mt-2 flex items-center gap-x-4">
                        <p
                          className={classNames(
                            tier.featured ? "text-blue-600" : "text-gray-900",
                            "text-4xl font-bold tracking-tight"
                          )}
                        >
                          {/* @ts-ignore */}
                          {tier.price[frequency.value]}
                        </p>
                        <div className="text-sm leading-5">
                          <p
                            className={
                              tier.featured ? "text-blue-600" : "text-gray-900"
                            }
                          >
                            USD
                          </p>
                          <p
                            className={
                              tier.featured ? "text-blue-500" : "text-gray-500"
                            }
                          >{`Billed ${frequency.value}`}</p>
                        </div>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          onClick={() => {
                            handelGetStarted(
                              tier.name,
                              // @ts-ignore
                              tier.price[frequency.value],
                              frequency.value
                            );
                          }}
                          size="lg"
                          className={classNames(
                            tier.featured
                              ? "bg-blue-600 hover:bg-blue-700"
                              : "bg-gray-900 hover:bg-gray-800",
                            "w-full rounded-lg px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors"
                          )}
                        >
                          Get started
                        </Button>
                      </motion.div>
                    </div>
                    <div className="mt-8 flow-root sm:mt-10">
                      <ul
                        role="list"
                        className={classNames(
                          tier.featured
                            ? "divide-blue-100 border-blue-100"
                            : "divide-gray-200 border-gray-200",
                          "-my-2 divide-y border-t text-sm leading-6"
                        )}
                      >
                        {tier.mainFeatures.map((mainFeature) => (
                          <motion.li
                            key={mainFeature}
                            className="flex gap-x-3 py-3"
                            whileHover={{ x: 5 }}
                          >
                            <span className="text-gray-700">{mainFeature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        <div className="relative bg-white lg:pt-14">
          <div className="mx-auto max-w-7xl px-6  lg:px-8">
            <section className="lg:hidden">
              <h2 id="mobile-comparison-heading" className="sr-only">
                Feature comparison
              </h2>

              <div className="mx-auto max-w-2xl space-y-16">
                {tiers.map((tier) => (
                  <motion.div
                    key={tier.id}
                    className="border-t border-gray-200"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    <div
                      className={classNames(
                        tier.featured
                          ? "border-blue-600"
                          : "border-transparent",
                        "-mt-px w-72 border-t-2 pt-10 md:w-80"
                      )}
                    >
                      <h3
                        className={classNames(
                          tier.featured ? "text-blue-600" : "text-gray-900",
                          "text-lg font-bold leading-6"
                        )}
                      >
                        {tier.name}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-gray-600">
                        {tier.description}
                      </p>
                    </div>

                    <div className="mt-8 space-y-8">
                      {sections.map((section) => (
                        <motion.div
                          key={section.name}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          viewport={{ once: true }}
                        >
                          <h4 className="text-sm font-semibold leading-6 text-gray-900">
                            {section.name}
                          </h4>
                          <div className="relative mt-6">
                            <div
                              className={classNames(
                                tier.featured
                                  ? "ring-2 ring-blue-600"
                                  : "ring-1 ring-gray-200",
                                "relative rounded-lg bg-white shadow-sm"
                              )}
                            >
                              <dl className="divide-y divide-gray-200 text-sm leading-6">
                                {section.features.map((feature) => (
                                  <motion.div
                                    key={feature.name}
                                    className="flex items-center justify-between px-4 py-3 sm:grid sm:grid-cols-2 sm:px-0"
                                    whileHover={{ backgroundColor: "#f8fafc" }}
                                  >
                                    <dt className="pr-4 text-gray-600">
                                      {feature.name}
                                    </dt>
                                    <dd className="flex items-center justify-end sm:justify-center sm:px-4">
                                      {/* @ts-ignore */}
                                      {typeof feature.tiers[tier.name] ===
                                      "string" ? (
                                        <span
                                          className={
                                            tier.featured
                                              ? "font-semibold text-blue-600"
                                              : "text-gray-900"
                                          }
                                        >
                                          {/* @ts-ignore */}
                                          {feature.tiers[tier.name]}
                                        </span>
                                      ) : (
                                        <>
                                          {/* @ts-ignore */}
                                          {feature.tiers[tier.name] === true ? (
                                            <Check
                                              aria-hidden="true"
                                              className="mx-auto h-5 w-5 text-blue-600"
                                            />
                                          ) : (
                                            <X
                                              aria-hidden="true"
                                              className="mx-auto h-5 w-5 text-gray-400"
                                            />
                                          )}
                                        </>
                                      )}
                                    </dd>
                                  </motion.div>
                                ))}
                              </dl>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Floating decorative elements */}
          </div>
        </div>
      </div>
    </section>
  );
}
