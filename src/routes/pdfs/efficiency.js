export default function WaterUseEfficiency() {
  const embedURL =
    'https://drive.google.com/file/d/1LkpS55BOe5YzoeHwnCNpe8cNYlM3jWsh/preview';

  return (
    <div className="container">
      <h5>Water Use Efficiency</h5>
      <iframe src={embedURL} width="100%" height="500" />
    </div>
  );
}