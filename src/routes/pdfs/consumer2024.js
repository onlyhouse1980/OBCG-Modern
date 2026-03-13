export default function Consumer2024() {
  const embedURL =
    "https://drive.google.com/file/d/138cLOdgQe-NH56BaG8h00q7hZw1qWDT_/preview";
  return (
    <div className="container">
      <h5>Consumer Confidence 2023</h5>
      <iframe src={embedURL} width="100%" height="500" />
    </div>
  );
}