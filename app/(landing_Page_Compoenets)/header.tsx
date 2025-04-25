"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Search, Menu, X, Globe, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Notification from "./notifications";
import { useCookies } from "next-client-cookies";

const navItems = ["Home", "Destinations", "Guides", "Contact", "FAQs"];

function Header() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [tierName, setTierName] = useState<string | null>(null);
  const [duration, setDuration] = useState<string | null>(null);
  const cookies = useCookies();
  const userId = cookies.get("id");
  const accessToken = cookies.get("accessToken");
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    
    const urlParams = new URLSearchParams(window.location.search);
    const sid = urlParams.get("session_id");
    const tier = urlParams.get("tier");
    const dur = urlParams.get("duration");

    setSessionId(sid);
    setTierName(tier);
    setDuration(dur);

    if (sid && tier && dur) {
      fetch("http://localhost:4000/stripe/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          sessionId: sid,
          tierName: tier,
          duration: dur,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.verified) {
           
            window.history.replaceState(
              {},
              document.title,
              window.location.pathname
            );
            setSessionId(null);
            setTierName(null);
            setDuration(null);
          }
        });
    }
  }, [sessionId]);

  const testStripeButton = async () => {
    try {
      await fetch("http://localhost:4000/stripe/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
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
    <>
      <header className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-white/80 backdrop-blur-md rounded-full shadow-lg px-4 sm:px-6 py-3 flex items-center justify-between w-[90%] max-w-5xl transition-all duration-300">
        {/* Logo Section */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Globe className="h-6 w-6 text-blue-600" />
          <span className="font-bold text-base sm:text-lg tracking-wide text-gray-800">
            Wanderly
          </span>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center space-x-2">
          {navItems.map((item) => (
            <Button
              key={item}
              variant="ghost"
              className="rounded-full text-sm px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition duration-200 ease-in-out"
            >
              {item}
            </Button>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Desktop Icons */}
          <div className="hidden sm:flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-blue-100 hover:text-blue-600 transition duration-200 ease-in-out"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Button>
            {accessToken && (
              <>
                {" "}
                <Notification />
              </>
            )}
          </div>

          <Button
            // onClick={() => router.push("/login")}
            onClick={testStripeButton}
            className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm sm:px-5 sm:text-base transition duration-200 ease-in-out"
          >
            Sign In
          </Button>

          {accessToken && (
            <>
              {" "}
              <span>Logout</span>
            </>
          )}

          {/* Burger Menu - Mobile */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMenuOpen(true)}
            className="md:hidden rounded-full hover:bg-blue-100 hover:text-blue-600"
            aria-label="Menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Slide-in Menu */}
            <motion.div
              className="fixed top-0 right-0 w-64 h-full bg-white z-50 shadow-lg p-6 flex flex-col gap-4"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Close Button */}
              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-full hover:bg-blue-100"
                >
                  <X className="h-6 w-6 text-gray-700" />
                </Button>
              </div>

              {/* Nav Items */}
              <nav className="flex flex-col space-y-2 mt-4">
                {navItems.map((item) => (
                  <Button
                    key={item}
                    variant="ghost"
                    className="justify-start text-gray-800 text-sm hover:bg-blue-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item}
                  </Button>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
