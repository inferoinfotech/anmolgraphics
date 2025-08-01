"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/stateful-button";
import { GlowingEffect } from "../ui/glowing-effect";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const clickLock = useRef(false);

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setStatus(""), 60000); // Clear after 60 sec
      return () => clearTimeout(timer);
    }
  }, [status]);

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email))
      newErrors.email = "Invalid email address.";

    if (!form.phone.trim()) newErrors.phone = "Phone number is required.";
    else if (!/^\d{10}$/.test(form.phone))
      newErrors.phone = "Phone number must be 10 digits.";

    if (!form.subject.trim()) newErrors.subject = "Subject is required.";
    if (!form.message.trim()) newErrors.message = "Message is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone" && (/[^0-9]/.test(value) || value.length > 10)) return; // Allow only numbers

    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };
  const handleSubmit = async () => {
    if (clickLock.current) return; // Prevent double clicks
    clickLock.current = true;
    setIsSubmitting(true);

    try {
      setStatus(""); // Reset status
      const isValid = validate();
      if (!isValid) return false;

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        setStatus("Failed to send message.");
        return false;
      }

      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      setStatus("Message sent successfully!");
      return true;
    } catch (error) {
      setStatus("Something went wrong. Please try again.");
      return false;
    } finally {
      setIsSubmitting(false);
      clickLock.current = false; // ✅ Release the lock
    }
  };

  useEffect(() => {
    // Reset status when form changes 
    console.log(isSubmitting)
  }, [isSubmitting]);
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-0 py-10 md:py-32">
      <span className='flex items-center gap-2 bg-[#f3f3f3] max-w-fit px-2 py-1 text-xs font-inter rounded-md'>
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
          <g>
            <path d="M6.6304 0.338424C6.67018 -0.112811 7.32982 -0.112807 7.3696 0.338428L7.72654 4.38625C7.75291 4.68505 8.10454 4.83069 8.33443 4.63804L11.4491 2.02821C11.7963 1.73728 12.2627 2.20368 11.9718 2.55089L9.36197 5.66556C9.1693 5.89546 9.31496 6.24709 9.61374 6.27346L13.6615 6.6304C14.1128 6.67018 14.1128 7.32982 13.6615 7.3696L9.61374 7.72654C9.31496 7.75291 9.1693 8.10454 9.36197 8.33443L11.9718 11.4491C12.2627 11.7963 11.7963 12.2627 11.4491 11.9718L8.33443 9.36197C8.10454 9.1693 7.75291 9.31496 7.72654 9.61374L7.3696 13.6615C7.32982 14.1128 6.67018 14.1128 6.6304 13.6615L6.27346 9.61374C6.24709 9.31496 5.89546 9.1693 5.66556 9.36197L2.55089 11.9718C2.20368 12.2627 1.73729 11.7963 2.02822 11.4491L4.63804 8.33443C4.83069 8.10454 4.68504 7.75291 4.38625 7.72654L0.338424 7.3696C-0.112811 7.32982 -0.112807 6.67018 0.338428 6.6304L4.38625 6.27346C4.68505 6.24709 4.83069 5.89546 4.63804 5.66556L2.02821 2.55089C1.73728 2.20368 2.20368 1.73729 2.55089 2.02822L5.66556 4.63804C5.89546 4.83069 6.24709 4.68504 6.27346 4.38625L6.6304 0.338424Z" fill="#166d99"></path>
          </g>
        </svg>
        FEEL FREE TO ASK
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
          <g>
            <path d="M6.6304 0.338424C6.67018 -0.112811 7.32982 -0.112807 7.3696 0.338428L7.72654 4.38625C7.75291 4.68505 8.10454 4.83069 8.33443 4.63804L11.4491 2.02821C11.7963 1.73728 12.2627 2.20368 11.9718 2.55089L9.36197 5.66556C9.1693 5.89546 9.31496 6.24709 9.61374 6.27346L13.6615 6.6304C14.1128 6.67018 14.1128 7.32982 13.6615 7.3696L9.61374 7.72654C9.31496 7.75291 9.1693 8.10454 9.36197 8.33443L11.9718 11.4491C12.2627 11.7963 11.7963 12.2627 11.4491 11.9718L8.33443 9.36197C8.10454 9.1693 7.75291 9.31496 7.72654 9.61374L7.3696 13.6615C7.32982 14.1128 6.67018 14.1128 6.6304 13.6615L6.27346 9.61374C6.24709 9.31496 5.89546 9.1693 5.66556 9.36197L2.55089 11.9718C2.20368 12.2627 1.73729 11.7963 2.02822 11.4491L4.63804 8.33443C4.83069 8.10454 4.68504 7.75291 4.38625 7.72654L0.338424 7.3696C-0.112811 7.32982 -0.112807 6.67018 0.338428 6.6304L4.38625 6.27346C4.68505 6.24709 4.83069 5.89546 4.63804 5.66556L2.02821 2.55089C1.73728 2.20368 2.20368 1.73729 2.55089 2.02822L5.66556 4.63804C5.89546 4.83069 6.24709 4.68504 6.27346 4.38625L6.6304 0.338424Z" fill="#166d99"></path>
          </g>
        </svg>

      </span>
      <h1 className="my-5 text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center sm:text-left font-bold leading-tight text-gray-900">Reach Out to Us</h1>

      <div className="relative my-10 mx-auto px-4 md:px-8 py-10 bg-white border rounded-2xl sm:rounded-3xl shadow-sm">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <form onSubmit={(e) => e.preventDefault()}>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["name", "email", "phone", "subject"].map((field) => (
              <div key={field}>
                <label className="block font-medium text-gray-700 mb-2 capitalize">
                  {field}
                </label>
                <input
                  type="text"
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  placeholder={`Enter your ${field}`}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
                <div className="h-5 mt-1">
                  {errors[field] && (
                    <p className="text-sm text-red-500">{errors[field]}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="md:col-span-2">
              <label className="block font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none"
              />
              <div className="h-5 mt-1">
                {errors.message && (
                  <p className="text-sm text-red-500">{errors.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <Button
              type="submit"
              disabled={isSubmitting}
              onClickStart={handleSubmit}
              onClickComplete={() => console.log("Success")}
              onClickError={() => console.log("Failed")}
            >
              Send Message
            </Button>
          </div>

          {status && (
            <p
              className={`text-center text-sm mt-4 ${status.includes("success")
                ? "text-green-600"
                : "text-red-500"
                }`}
            >
              {status}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
