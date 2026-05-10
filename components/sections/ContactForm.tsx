"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { T } from "@/lib/i18n";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-stone-200 bg-white p-12 text-center dark:border-stone-800 dark:bg-stone-900">
        <CheckCircle className="h-12 w-12 text-accent" />
        <h3 className="text-xl font-semibold">
          <T zh="消息已发送！" en="Message sent!" />
        </h3>
        <p className="text-stone-600 dark:text-stone-400">
          <T zh="感谢你的来信，我会尽快回复。" en="Thank you for reaching out. I'll get back to you soon." />
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl border border-stone-200 bg-white p-8 dark:border-stone-800 dark:bg-stone-900"
    >
      <div>
        <label
          htmlFor="name"
          className="mb-1 block text-sm font-medium"
        >
          <T zh="姓名" en="Name" />
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={form.name}
          onChange={handleChange}
          className="w-full rounded-lg border border-stone-300 bg-stone-50 px-4 py-2.5 text-sm transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 dark:border-stone-700 dark:bg-stone-800"
          placeholder="Your name"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-1 block text-sm font-medium"
        >
          <T zh="邮箱" en="Email" />
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
          className="w-full rounded-lg border border-stone-300 bg-stone-50 px-4 py-2.5 text-sm transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 dark:border-stone-700 dark:bg-stone-800"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-1 block text-sm font-medium"
        >
          <T zh="留言" en="Message" />
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          className="w-full resize-y rounded-lg border border-stone-300 bg-stone-50 px-4 py-2.5 text-sm transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 dark:border-stone-700 dark:bg-stone-800"
          placeholder="What would you like to talk about?"
        />
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
          <AlertCircle size={16} />
          <T zh="发送失败，请重试。" en="Something went wrong. Please try again." />
        </div>
      )}

      <Button type="submit" disabled={status === "sending"} className="w-full">
        {status === "sending" ? (
          <T zh="发送中..." en="Sending..." />
        ) : (
          <>
            <Send size={16} /> <T zh="发送消息" en="Send Message" />
          </>
        )}
      </Button>
    </form>
  );
}
