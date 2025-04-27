"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Quote, SendHorizonal, ThumbsDown, ThumbsUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { cn } from "@/lib/utils";
import { BeatLoader } from "react-spinners";

interface Response {
  role: string;
  text: string;
}

export const IoSection = () => {
  const [value, setValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [responses, setRespones] = useState<Response[]>([
    {
      role: "model",
      text: "Shoot your concern, lil bro.",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    console.log("scroll");
  };

  useEffect(() => {
    if (responses.length > 0) {
      scrollToBottom();
    }
  }, [responses]);

  const handleGenerate = async () => {
    if (!value.trim()) {
      toast.error("Please enter your concern first");
      return;
    }

    setLoading(true);
    try {
      const newResponses = [
        ...responses,
        { role: "user", text: value },
        {
          role: "model",
          text: "LOADING",
        },
      ];
      setRespones(newResponses);

      const response = await axios.post("/api/genai", {
        concern: value,
        history: responses,
      });
      newResponses.pop();
      newResponses.push({
        role: "model",
        text: response.data.response,
      });
      setRespones([...newResponses]);
      setValue("");
    } catch (error) {
      console.error("API Error:", error);
      toast.error("Something went wrong, please try again later.");
      setRespones([...responses]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setRespones([
      {
        role: "model",
        text: "Shoot your concern, lil bro.",
      },
    ]);
    setValue("");
  };

  return (
    <div className="w-full lg:w-2xl rounded-lg bg-[#1F2937] border border-[#374151] p-5 flex flex-col gap-6">
      <div className="flex flex-col gap-6">
        <Quote
          onClick={handleReset}
          strokeWidth={1.5}
          className="text-purple-500 cursor-pointer"
        />
        <div className="flex flex-col gap-2 max-h-[320px] md:max-h-[400px] overflow-y-auto scrollbar-hide">
          {responses.map((res, index) => (
            <div
              className={cn(
                "flex flex-col gap-2 max-w-10/12 md:max-w-8/12 w-max",
                res.role === "user"
                  ? "self-end rounded-br-none"
                  : "self-start rounded-bl-none"
              )}
              key={index}
            >
              <div
                className={cn(
                  "relative text-base bg-[#374151] rounded-md p-3 font-medium ",
                  res.role === "user" ? "rounded-br-none" : "rounded-bl-none"
                )}
              >
                {res.role === "model" && res.text === "LOADING" ? (
                  <BeatLoader size={5} color={"#9CA3AF"} />
                ) : (
                  <span>{res.text}</span>
                )}

                <div ref={messagesEndRef} />
              </div>
              {res.role === "model" &&
                index !== 0 &&
                res.text !== "LOADING" && (
                  <div className="flex justify-end w-full gap-2">
                    <Button
                      size={"icon"}
                      className="cursor-pointer bg-[#374151] hover:text-red-500 transition-colors hover:bg-[#374151]"
                      disabled
                      onClick={() => {
                        toast.error("Servers are not running. Lmao.");
                      }}
                    >
                      <ThumbsDown className="size-4 " />
                    </Button>
                    <Button
                      size={"icon"}
                      className="cursor-pointer bg-[#374151] hover:text-green-500 transition-colors hover:bg-[#374151]"
                      onClick={() => {
                        toast.success("I know my shit.");
                      }}
                    >
                      <ThumbsUp className="size-4 " />
                    </Button>
                  </div>
                )}
            </div>
          ))}
        </div>
        <div className="w-full flex">
          <div className="border bg-[#111827]  border-[#374151] rounded-md p-2 flex flex-col gap-2 w-full">
            <Textarea
              disabled={loading}
              className="focus-visible:ring-0 shadow-none border-none outline-none focus:ring-0 w-full p-0 placeholder:text-[#9CA3AF]"
              placeholder="Ask RealityCheck"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <div className="flex justify-end w-full gap-2">
              <Button
                className="bg-[#374151] hover:bg-[#374151] cursor-pointer"
                onClick={handleGenerate}
                disabled={loading}
              >
                Send Message
                <SendHorizonal className="size-4 " />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
