type Props = {
  prompt: string;
  setPrompt: (value: string) => void;
  onSubmit: () => void;
};

export default function PromptInput({ prompt, setPrompt, onSubmit }: Props) {
  return (
    <div className="w-full mb-6">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt here..."
        rows={4}
        className="w-full p-4 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none resize-none transition-colors duration-300"
        style={{
          background: "var(--card-bg)",
          color: "var(--card-foreground)",
        }}
      />
      <button
        onClick={onSubmit}
        className="mt-3 px-6 py-2 rounded font-medium transition transition-colors duration-300"
        style={{
          backgroundColor: "#3860b6ff",
          color: "white",
        }}
      >
        Compare Models
      </button>
    </div>
  );
}
