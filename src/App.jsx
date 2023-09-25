import { useState } from 'react';

const generatePassword = (length, includeSpecialChars, includeNumbers) => {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';
  const numbers = '0123456789';

  let validCharset = charset;

  if (includeSpecialChars) {
    validCharset += specialChars;
  }
  if (includeNumbers) {
    validCharset += numbers;
  }

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * validCharset.length);
    password += validCharset[randomIndex];
  }
  return password;
};

const PasswordGenerator = () => {
  const [passwordLength, setPasswordLength] = useState(12);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [password, setPassword] = useState('');

  const handleGeneratePassword = () => {
    const generatedPassword = generatePassword(passwordLength, includeSpecialChars, includeNumbers);
    setPassword(generatedPassword);
  };

  const handleCopyToClipboard = () => {
    const passwordField = document.getElementById('generatedPassword');
    passwordField.select();
    document.execCommand('copy');
  };


  return (
    <div className="max-w-2xl w-8/12 mx-auto mt-10 p-6 border rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Password Generator</h2>
      <div className="flex items-center mb-4">
        <label htmlFor="passwordLength" className="mr-2">Password Length:</label>
        <input
          type="number"
          id="passwordLength"
          value={passwordLength}
          onChange={(e) => setPasswordLength(e.target.value)}
          className="border p-1 w-20"
        />
        <div className="ml-4">
          <input
            type="checkbox"
            id="includeSpecialChars"
            checked={includeSpecialChars}
            onChange={() => setIncludeSpecialChars(!includeSpecialChars)}
            className="mr-2"
          />
          <label htmlFor="includeSpecialChars"> Special Characters</label>
        </div>
        <div className="ml-4">
          <input
            type="checkbox"
            id="includeNumbers"
            checked={includeNumbers}
            onChange={() => setIncludeNumbers(!includeNumbers)}
            className="mr-2"
          />
          <label htmlFor="includeNumbers"> Numbers</label>
        </div>
      </div>
      <button onClick={handleGeneratePassword} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Generate Password
      </button>
      <div className="mt-4">
        <label htmlFor="generatedPassword" className="block mb-2">Generated Password:</label>
        <input
          type="text"
          id="generatedPassword"
          value={password}
          readOnly
          className="border p-2 w-full"
        />
      </div>
      <button onClick={handleCopyToClipboard} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Copy to Clipboard
      </button>
    </div>
  );
};

function App() {
  return (
    <>
      <div>
        <h1 className='text-4xl text-center'>Password generator</h1>
        <PasswordGenerator />
      </div>
    </>
  );
}

export default App;
