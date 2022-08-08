import { useState } from "react";
import "./App.css";

const Section = ({
  name,
  value,
  onChange,
}: {
  name: string;
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <div>
      <label>{name}</label>
      <input
        defaultValue={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
};

const NewParam = ({ addNew }: { addNew: (n: string) => void }) => {
  const [newName, setNewName] = useState<string | null>();

  return (
    <div>
      <input onChange={(event) => setNewName(event.target.value)} />
      <button disabled={!newName} onClick={() => addNew(newName!)}>
        Add new +
      </button>
    </div>
  );
};

function App({
  url,
  navigate,
}: {
  url: URL;
  navigate: (value: string) => void;
}) {
  const [state, setState] = useState<{ host: string } & Record<string, string>>(
    {
      host: url.protocol + "//" + url.host,
      ...Object.fromEntries(Array.from(new URLSearchParams(url.search))),
    }
  );

  const updateParam = (key: string, newValue: string) => {
    setState((oldState) => {
      return { ...oldState, [key]: newValue };
    });
  };

  const addNew = (name: string) => {
    updateParam(name, "");
  };

  const updateURL = () => {
    const { host, ...queryParams } = state;
    const myUrlWithParams = new URL(host);
    Object.entries(queryParams).forEach(([key, value]) => {
      myUrlWithParams.searchParams.append(key, value);
    });

    navigate(myUrlWithParams.href);
  };

  return (
    <div>
      {Object.entries(state).map(([key, value]) => (
        <Section
          key={key}
          name={key}
          value={value}
          onChange={(value) => updateParam(key, value)}
        />
      ))}
      <NewParam addNew={addNew} />
      <div>
        <button onClick={updateURL}>Go to new URL</button>
      </div>
    </div>
  );
}

export default App;
