import React from "react";
import Link from "@node_modules/next/link";
const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Prompt</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered pl
      </p>
      <form
        className="glassmorphism mt-10 max-w-2xl w-full flex flex-col gap-7"
        onSubmit={handleSubmit}
      >
        <label>
          <span className="font-satoshi font-semibold base_text">
            Your Prompt
          </span>
          <textarea
            value={post.prompt}
            onChange={(e) => {
              setPost({ ...post, prompt: e.target.value });
            }}
            placeholder="Write your prompt"
            className="form_textarea"
            required
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold base_text">
            Tag <span>(#promptgeneration #idea #AI)</span>
          </span>
          <input
            className="form_input"
            value={post.tag}
            onChange={(e) => {
              setPost({ ...post, tag: e.target.value });
            }}
            placeholder="Write your prompt"
            required
          />
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white hover:bg-orange-300"
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
