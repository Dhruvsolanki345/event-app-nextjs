import Button from "./Button";

export default function ErrorCard(props) {
  const { children, btnTitle, btnHref } = props;

  return (
    <div className="w-max mx-auto my-8">
      <div className="bg-red-400 px-16 py-8 text-green-100 font-semibold text-xl rounded">
        {children}
      </div>
      <Button href={btnHref} title={btnTitle} className="mx-auto" />
    </div>
  );
}
