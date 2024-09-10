type Props = {
  content: string;
  loading: boolean;
};

export default function SubmitButton({ content, loading }: Props) {

  return (
    <button
      className="p-2 mb-2 border border-slate rounded-sm transition duration-200 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
      type="submit"
      disabled={ loading }
    >
      { loading ? "Loading..." : content }
    </button>
  );
}