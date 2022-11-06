import { useState } from 'react';

export default function Home() {
  const [isPasswordGenerating, setIsPasswordGenerating] = useState(false);

  const [generatedPassword, setGeneratedPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState(20);
  const [numberInclude, setNumberInclude] = useState(true);
  const [symbolInclude, setSymbolInclude] = useState(true);

  const [secret, setSecret] = useState('');
  const [encryptText, setEncryptText] = useState('');
  const [encryptedText, setEncryptedText] = useState('');
  const [decryptText, setDecryptText] = useState('');
  const [decryptedText, setDecryptedText] = useState('');

  const generatePassword = async (e) => {
    setIsPasswordGenerating(true);
    if (passwordLength > 100) {
      alert('Your password length is bigger than 100');
      return;
    }
    const response = await fetch(
      `/api/generate-password?length=${passwordLength}&number=${numberInclude}&symbol=${symbolInclude}`
    );
    const { password } = await response.json();
    setGeneratedPassword(password);
    navigator.clipboard.writeText(password);
    setIsPasswordGenerating(false);
  };
  const encrypt = async (e) => {
    const response = await fetch(
      `/api/encrypt?secret=${secret}&text=${encryptText}`
    );
    const result = await response.json();
    setEncryptedText(JSON.stringify(result));
    navigator.clipboard.writeText(JSON.stringify(result));
  };
  const decrypt = async (e) => {
    const response = await fetch(
      `/api/decrypt?secret=${secret}&text=${decryptText}`
    );
    const result = await response.json();
    setDecryptedText(result.password);
    navigator.clipboard.writeText(JSON.stringify(result));
  };

  return (
    <div className='container'>
      <div className='block'>
        <h3 className='title'>Generate key</h3>
        <button onClick={generatePassword}>
          {isPasswordGenerating ? 'Generating' : 'Generate'}
        </button>

        <input value={generatedPassword} onChange={() => {}} />
        <div>
          length
          <input
            value={passwordLength}
            onChange={(e) => setPasswordLength(e.target.value)}
            type='number'
          />
          <br />
          number
          <input
            value={numberInclude}
            onChange={(e) => setNumberInclude(e.target.value)}
            type='boolean'
          />
          <br />
          symbol
          <input
            value={symbolInclude}
            onChange={(e) => setSymbolInclude(e.target.value)}
          />
        </div>
      </div>
      <div className='block'>
        <h3 className='title'>Encrypt</h3>
        <input value={secret} onChange={(e) => setSecret(e.target.value)} />
        <input
          value={encryptText}
          placeholder='Encrypt text'
          onChange={(e) => setEncryptText(e.target.value)}
          onKeyDown={(e) =>
            e.code === 'Enter' || (e.code === 'NumpadEnter' && encrypt())
          }
        />
        <input value={encryptedText} placeholder='Secret' />
      </div>
      <div className='block'>
        <h3 className='title'>Decrypt</h3>
        <input
          value={decryptText}
          onChange={(e) => setDecryptText(e.target.value)}
          onKeyDown={(e) =>
            e.code === 'Enter' || (e.code === 'NumpadEnter' && decrypt())
          }
        />
        <input value={decryptedText} placeholder='Secret' />
      </div>
    </div>
  );
}
