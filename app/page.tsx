import ComparisonTool from "./components/ComparisonTool";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './globals.css'; // or './styles.css', depending on your project setup

import 'tailwindcss/tailwind.css';


export default function Home() {
  return (
    <div className="App container mx-auto p-4">
      <ComparisonTool />
    </div>
  );
}
