import { useEffect, useState } from 'react';
import { HiOutlineKey } from 'react-icons/hi';
import { MdContentCopy, MdRepeat } from 'react-icons/md';

export default function Home() {
  return (
    <div className='main-container'>
      <div className='container'>
        <GenerateRandomString />
        <CryptingString />
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

const initialRandStrType = {
  lowercase: true,
  uppercase: true,
  number: true,
  symbol: true,
};
const randStrLengthInitial = 20;
const GenerateRandomString = () => {
  const [isChangingRandStr, setIsChangingRandStr] = useState(false);
  const [randStr, setRandStr] = useState('');
  const [randStrLength, setRandStrLength] = useState(randStrLengthInitial);
  const [randStrType, setRandStrType] = useState(initialRandStrType);

  const checkValues = (string) => {
    let lowerCaseInclude = false;
    let upperCaseInclude = false;
    return initialRandStrType;
  };

  const clipboardRandStr = () => {
    navigator.clipboard.writeText(randStr);
  };
  const regenerate = () => {
    generateRandomString();
  };

  const onChange = (e) => {
    const { id, checked, name, value } = e.target;
    if (name === 'str') {
      setRandStr(value);
      const length = value.length;
      const type = checkValues(value);
      setRandStrLength(length);
      setRandStrType(type);
    }
    if (name === 'length') {
      setRandStrLength(value);
      setIsChangingRandStr(!isChangingRandStr);
    }
    if (name === 'type') {
      setRandStrType({
        ...randStrType,
        [id]: checked,
      });
      setIsChangingRandStr(!isChangingRandStr);
    }
  };

  const generateRandomString = async () => {
    let query = `length=${randStrLength}&`;
    Object.keys(randStrType).forEach((e) => {
      query += `${e}=${randStrType[e]}&`;
    });
    const response = await fetch(`/api/generate-password?${query}`);
    const result = await response.json();
    const { string } = result;
    setRandStr(string);
  };

  useEffect(() => {
    generateRandomString();
  }, [isChangingRandStr]);

  return (
    <div className='block'>
      <div className='input-group'>
        <MdContentCopy className='icon icon1' onClick={clipboardRandStr} />
        <MdRepeat className='icon icon2' onClick={regenerate} />
        <input
          className='random-string'
          name='str'
          value={randStr}
          onChange={onChange}
        />
      </div>

      <div className='customize card'>
        <span>Customize your random string</span>
        <div className='range-length'>
          <div>String length</div>
          <input
            className='input'
            type='range'
            name='length'
            value={randStrLength}
            onChange={onChange}
          />
          <input
            className='output'
            type='number'
            name='length'
            value={randStrLength}
            onChange={onChange}
          />
        </div>
        <div className='char-type'>
          {Object.keys(randStrType).map((type) => (
            <div key={type}>
              <input
                id={type}
                name='type'
                type='checkbox'
                checked={randStrType[type]}
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

const CryptingString = () => {
  const [isEncryptTab, setIsEncryptTab] = useState(true);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [secret, setSecret] = useState('');
  const changeTab = () => {
    setIsEncryptTab(!isEncryptTab);
    setInput('');
    setOutput('');
  };

  const enterSecret = () => {
    const secret_input = prompt('Please enter your secret');
    secret_input !== null ? setSecret(secret_input) : null;
  };
  const copyOutput = () => {
    navigator.clipboard.writeText(output);
  };
  const encrypt = async (text) => {
    const response = await fetch(`/api/encrypt`, {
      method: 'POST',
      body: JSON.stringify({
        secret,
        encryptText: text,
      }),
    });
    const result = await response.json();
    setOutput(JSON.stringify(result));
  };
  const decrypt = async (text) => {
    const response = await fetch(`/api/decrypt`, {
      method: 'POST',
      body: JSON.stringify({
        secret,
        decryptText: text,
      }),
    });
    const result = await response.json();
    setOutput(result.password);
  };
  const changeInputAndEncrypt = (e) => {
    setInput(e.target.value);
    if (isEncryptTab) {
      encrypt(e.target.value);
    } else {
      decrypt(e.target.value);
    }
  };
  return (
    <div className='card crypting'>
      <span
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}>
        {isEncryptTab ? (
          <span className='tab-title' onDoubleClick={changeTab}>
            Encrypt your string
          </span>
        ) : (
          <span className='tab-title' onDoubleClick={changeTab}>
            Decrypt your string
          </span>
        )}
        <HiOutlineKey style={{ cursor: 'pointer' }} onClick={enterSecret} />
      </span>
      <div className='section'>
        <input value={input} onChange={changeInputAndEncrypt} />
        <div className='crypto-output'>
          <MdContentCopy className='icon' onClick={copyOutput} />
          <input value={output} disabled />
        </div>
      </div>
    </div>
  );
};
