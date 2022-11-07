import { useEffect, useState } from 'react';
import { BsGrid3X3GapFill } from 'react-icons/bs';
import { MdContentCopy, MdRepeat } from 'react-icons/md';

export default function Home() {
  // Generate random string component
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
    if (passwordLength > 100) {
      alert('Your password length is bigger than 100');
      return;
    }
    const response = await fetch(
      `/api/generate-password?length=${passwordLength}&number=${numberInclude}&symbol=${symbolInclude}`
    );
    const { password } = await response.json();
    setGeneratedPassword(password);
  };
  const encrypt = async (e) => {
    const response = await fetch(`/api/encrypt`, {
      method: 'POST',
      body: JSON.stringify({
        secret,
        encryptText,
      }),
    });
    const result = await response.json();
    setEncryptedText(JSON.stringify(result));
  };
  const decrypt = async (e) => {
    const response = await fetch(
      `/api/decrypt?secret=${secret}&text=${decryptText}`,
      {
        method: 'POST',
        body: JSON.stringify({
          secret,
          decryptText,
        }),
      }
    );
    const result = await response.json();
    setDecryptedText(result.password);
  };

  return (
    <div className='main-container'>
      <div className='container'>
        <GenerateRandomString />
        {/* <div className='block'>
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
          <input
            value={encryptedText}
            placeholder='Secret'
            onChange={() => {}}
          />
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
          <input
            value={decryptedText}
            placeholder='Secret'
            onChange={() => {}}
          />
        </div> */}
      </div>
    </div>
  );
}

const initialRandStr = {
  str: '',
  length: 20,
  type: {
    lowercase: true,
    uppercase: true,
    number: true,
    symbol: true,
  },
};
const GenerateRandomString = () => {
  const [randStr, setRandStr] = useState(initialRandStr);
  const onChange = (e) => {
    const { name, id, checked, value } = e.target;
    if (['str', 'length'].includes(name)) {
      setRandStr({ ...randStr, [name]: value });
    }
    if (name === 'type') {
      setRandStr({
        ...randStr,
        type: { ...randStr.type, [id]: checked },
      });
    }
  };

  const generateRandomString = async () => {
    const { length, type } = randStr;
    // const response = await fetch(
    //   `/api/generate-password?length=${randStr.length}&number=${numberInclude}&symbol=${symbolInclude}`
    // );
    for (const key in Object.keys(type)) {
      console.log(key);
    }
  };

  useEffect(() => {
    console.log('String changeing');
    generateRandomString();
  }, [randStr]);

  return (
    <div className='block'>
      <h3 className='title'>Generate random string</h3>
      <div className='input-group'>
        <MdContentCopy className='icon1' />
        <MdRepeat className='icon2' />
        <input
          className='random-string'
          name='str'
          value={randStr.str}
          onChange={onChange}
        />
      </div>

      <div className='customize'>
        <span>Customize your random string</span>
        <div className='range-length'>
          <div>String length</div>
          <input
            className='input'
            type='range'
            name='length'
            value={randStr.length}
            onChange={onChange}
          />
          <input
            className='output'
            type='number'
            name='length'
            value={randStr.length}
            onChange={onChange}
          />
        </div>
        <div className='char-type'>
          {Object.keys(randStr.type).map((type) => (
            <div key={type}>
              <input
                id={type}
                name='type'
                type='checkbox'
                checked={randStr.type[type]}
                onChange={onChange}
              />
              <label htmlFor={type}>
                {type[0].toUpperCase() + type.slice(1)}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
