import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import BackToTopButton from './BackToTop';

type Theme = 'pink' | 'brown' | 'white' | 'black';
type CustomTheme = 'blue' | 'brown' | 'white' | 'black' | 'rainbow';

const CustomTextArea: React.FC = () => {
  const [theme, setTheme] = useState<CustomTheme>('blue');

  const getThemeColors = (theme: CustomTheme) => {
    switch (theme) {
      case 'blue':
        return { bg: '#fefcd0', textColor: 'black', borderColor: 'black' };
      case 'brown':
        return { bg: '#d2b48c', textColor: 'black', borderColor: 'black' };
      case 'white':
        return { bg: 'white', textColor: 'black', borderColor: 'black' };
      case 'black':
        return { bg: 'black', textColor: 'white', borderColor: 'white' };
      case 'rainbow':
        return {
          bg: 'linear-gradient(45deg, red, orange, yellow, green, blue, indigo, violet)',
          textColor: 'white',
          borderColor: 'white',
        };
      default:
        return { bg: 'white', textColor: 'black', borderColor: 'black' };
    }
  };

  const themeColors = getThemeColors(theme);

  return (
    <div className='p-4 rounded-lg'>
      <h2 className='text-2xl text-black font-bold mb-4'>Custom TextArea</h2>
      <p className='text-black mb-4'>
        Customize your textarea's appearance by selecting a preset theme or
        creating your own color scheme.
      </p>
      <div className='mb-4'>
        <label className='block text-black mb-2'>Theme:</label>
        <div className='flex space-x-2'>
          {(
            ['blue', 'brown', 'white', 'black', 'rainbow'] as CustomTheme[]
          ).map(t => (
            <button
              key={t}
              className={`w-6 h-6 rounded-full ${t === theme ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
              style={{
                background:
                  t === 'rainbow'
                    ? 'linear-gradient(45deg, red, orange, yellow, green, blue, indigo, violet)'
                    : getThemeColors(t).bg,
              }}
              onClick={() => setTheme(t)}
            />
          ))}
        </div>
      </div>

      <textarea
        className='w-full h-32 p-2 rounded'
        style={{
          backgroundColor: themeColors.bg.includes('linear-gradient')
            ? 'transparent'
            : themeColors.bg,
          color: themeColors.textColor,
          borderColor: themeColors.borderColor,
          borderWidth: '1px',
          borderStyle: 'solid',
          backgroundImage: themeColors.bg.includes('linear-gradient')
            ? themeColors.bg
            : 'none',
        }}
        placeholder='Enter your text here...'
      />

      <div className='mt-4 bg-yellow-200 text-black p-2 rounded'>
        <pre className='text-sm max-sm:text-[0.55rem]'>
          {`<textarea
  style={{
    backgroundColor: '${themeColors.bg.includes('linear-gradient') ? 'transparent' : themeColors.bg}',
    color: '${themeColors.textColor}',
    borderColor: '${themeColors.borderColor}',
    borderWidth: '1px',
    borderStyle: 'solid',
    backgroundImage: '${themeColors.bg.includes('linear-gradient') ? themeColors.bg : 'none'}'
  }}
  placeholder="Enter your text here..."
/>`}
        </pre>
      </div>
    </div>
  );
};

const TextareaDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTheme =
    (location.state as { currentTheme?: Theme })?.currentTheme || 'pink';

  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
    {},
  );

  const getThemeClasses = () => {
    switch (currentTheme) {
      case 'white':
        return 'bg-gradient-to-br from-gray-50 to-white text-gray-100';
      case 'black':
        return 'bg-gradient-to-br from-gray-900 to-black text-white';
      case 'brown':
        return 'bg-gradient-to-br from-yellow-800 to-yellow-600 text-white';
      default:
        return 'bg-gradient-to-br from-pink-400 to-purple-500 text-white';
    }
  };

  const getGlassyClasses = () => {
    const baseClasses =
      'backdrop-filter backdrop-blur-md border border-opacity-30 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300';
    switch (currentTheme) {
      case 'white':
        return `${baseClasses} bg-gray-500 bg-opacity-10 border-gray-300 text-gray-100`;
      case 'black':
        return `${baseClasses} bg-white bg-opacity-10 border-gray-600 text-white`;
      case 'brown':
        return `${baseClasses} bg-white bg-opacity-10 border-yellow-300 text-white`;
      default:
        return `${baseClasses} bg-white bg-opacity-10 border-pink-300 text-white`;
    }
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedStates(prev => ({ ...prev, [key]: true }));
      setTimeout(
        () => setCopiedStates(prev => ({ ...prev, [key]: false })),
        2000,
      );
    });
  };

  const CopyButton: React.FC<{ text: string; codeKey: string }> = ({
    text,
    codeKey,
  }) => (
    <button
      onClick={() => copyToClipboard(text, codeKey)}
      className={`absolute top-4 right-4 border border-black rounded-lg shadow-lg p-2 hover:bg-opacity-20 text-black`}
      title='Copy to clipboard'
    >
      {copiedStates[codeKey] ? <Check size={20} /> : <Copy size={20} />}
    </button>
  );

  return (
    <div className='min-h-screen p-8 font-sans bg-gradient-to-br from-pink-300 to-pink-300 text-gray-800 relative'>
      <BackToTopButton />

      <div className='relative z-10 text-black'>
        <button
          style={{ color: 'black' }}
          onClick={() => navigate(-1)}
          className={`mb-8 flex items-center bg-orange-300 border border-white border-opacity-20 rounded-lg shadow-lg transition-all duration-300 max-sm:px-1 px-4 py-2 hover:bg-opacity-80 text-black`}
        >
          <ArrowLeft size={20} className='mr-2' />
          Back to Components
        </button>

        <h1 className='text-4xl font-bold mb-8 text-black'>
          TextArea Component
        </h1>

        {/* Basic Usage */}
        <div className={`${getGlassyClasses()} p-6 mb-8 relative`}>
          <h2 className='text-2xl text-black font-bold mb-4'>Basic Usage</h2>
          <pre className='bg-rose-400 text-black p-4 rounded-lg overflow-x-auto'>
            {`function App() {
  return (
    <textarea
      placeholder="Enter your text here..."
      onChange={(e) => console.log(e.target.value)}
    />
  );
}`}
          </pre>
          <CopyButton
            text={`function App() {
  return (
    <textarea
      placeholder="Enter your text here..."
      onChange={(e) => console.log(e.target.value)}
    />
  );
}`}
            codeKey='basicUsage'
          />
        </div>

        {/* Props */}
        <div className={`${getGlassyClasses()} p-6 mb-8`}>
          <h2 className='text-2xl text-black font-bold mb-4'>Props</h2>
          <div className='overflow-x-auto text-black'>
            <table className='w-full'>
              <thead>
                <tr className='bg-white text-gray bg-opacity-40'>
                  <th className='text-left p-2'>Prop</th>
                  <th className='text-left p-2'>Type</th>
                  <th className='text-left p-2'>Default</th>
                  <th className='text-left p-2'>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='p-2'>style</td>
                  <td className='p-2'>CSSProperties</td>
                  <td className='p-2'>{}</td>
                  <td className='p-2'>Inline styles for the textarea</td>
                </tr>
                <tr className='bg-white bg-opacity-40'>
                  <td className='p-2'>className</td>
                  <td className='p-2'>string</td>
                  <td className='p-2'>""</td>
                  <td className='p-2'>
                    Additional CSS classes to apply to the textarea
                  </td>
                </tr>
                <tr>
                  <td className='p-2'>placeholder</td>
                  <td className='p-2'>string</td>
                  <td className='p-2'>""</td>
                  <td className='p-2'>Placeholder text for the textarea</td>
                </tr>
                <tr className='bg-white bg-opacity-40'>
                  <td className='p-2'>onChange</td>
                  <td className='p-2'>function</td>
                  <td className='p-2'>undefined</td>
                  <td className='p-2'>
                    Function to call when the textarea value changes
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Custom TextArea */}
        <div className={`${getGlassyClasses()} p-6 text-black mb-8`}>
          <CustomTextArea />
        </div>

        {/* Additional Examples */}
        <div className={`${getGlassyClasses()} p-6 mt-8`}>
          <h2 className='text-2xl text-black font-bold mb-4'>
            Additional Examples
          </h2>

          <h3 className='text-xl text-gray-600 font-semibold mb-2'>
            With Custom Styling
          </h3>
          <div className={`${getGlassyClasses()} p-4 mb-4`}>
            <textarea
              className='w-full h-32 p-2 bg-blue-100 bg-opacity-50 text-black border-2 border-black rounded-lg focus:outline-none focus:border-blue-500 transition-all duration-300'
              placeholder='Type something...'
            />
          </div>
          <pre className='bg-rose-400 text-black p-4 rounded-lg overflow-x-auto relative'>
            {`<textarea
  className="w-full h-32 p-2"
  style={{
    backgroundColor: '#f0f0f0',
    color: 'gray',
    borderColor: 'gray',
    borderWidth: '1px',
    borderStyle: 'solid'
  }}
  placeholder="Type something..."
/>`}
          </pre>
          <CopyButton
            text={`<textarea
  className="w-full h-32 p-2"
  style={{
    backgroundColor: '#f0f0f0',
    color: 'gray',
    borderColor: 'gray',
    borderWidth: '1px',
    borderStyle: 'solid'
  }}
  placeholder="Type something..."
/>`}
            codeKey='customStyling'
          />
        </div>
      </div>
    </div>
  );
};

export default TextareaDetailPage;
