function InvalidInputMessage({
  message = "Please fill this input correctly",
}: {
  message?: string;
}) {
  return <p className="text-red-500 font-bold text-base">{message}</p>;
}

export default InvalidInputMessage;
