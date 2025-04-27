"use client";

import { Button } from "@/components/ui/button";
import { Github, Heart, Quote } from "lucide-react";
import { useState } from "react";

export const Navbar = () => {
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const shareLink = "https://www.nilabjo.com/";

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out RealityCheck",
          url: shareLink,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareLink);
        setIsLinkCopied(true);
        setTimeout(() => setIsLinkCopied(false), 2000);
      } catch (error) {
        window.open(shareLink, "_blank");
      }
    }
  };

  return (
    <div className="w-full border-b border-[#374151]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <Quote className="text-purple-500" strokeWidth={1.5} />
          <h1 className="font-medium text-xl">RealityCheck</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={"secondary"}
            size={"sm"}
            className="rounded-sm font-semibold cursor-pointer"
            asChild
          >
            <a
              target="_blank"
              href="https://github.com/cyberserk7/realitycheck"
            >
              <Github />
              Github
            </a>
          </Button>
          <Button
            variant={"secondary"}
            size={"sm"}
            className="rounded-sm font-semibold cursor-pointer"
            onClick={handleShare}
          >
            <Heart />
            {isLinkCopied ? "Link Copied!" : "Share"}
          </Button>
        </div>
      </div>
    </div>
  );
};
