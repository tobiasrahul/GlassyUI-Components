import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import BackToTopButton from './BackToTop';

const SliderDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
    {},
  );
  const [customBgColor, setCustomBgColor] = useState('#ffffff');
  const [customOpacity, setCustomOpacity] = useState(50);
  const [customCode, setCustomCode] = useState('');
  const [sliderValue, setSliderValue] = useState(50);

  // Update customCode whenever sliderValue, customBgColor, or customOpacity changes
  useEffect(() => {
    const code = `<input
  type="range"
  min="0"
  max="100"
  value={${sliderValue}}
  onChange={handleSliderChange}
  class="${getGlassyClasses(customOpacity)} 
  w-full h-2 rounded-lg appearance-none cursor-pointer"
  style={{
    background: \`linear-gradient(90deg, '${customBgColor}' \${sliderValue}%, '#cccccc' \${sliderValue}%)\`,
  }} />`;
    setCustomCode(code);
  }, [sliderValue, customBgColor, customOpacity]);

  const getGlassyClasses = (opacity = 10) => {
    return `backdrop-filter backdrop-blur-lg bg-white bg-opacity-${opacity} 
  border border-white border-opacity-20 rounded-lg shadow-lg transition-all duration-300`;
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValue(Number(e.target.value));
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
      className={`absolute top-4 right-4 ${getGlassyClasses()} p-2 hover:bg-opacity-20 text-black`}
      title='Copy to clipboard'
    >
      {copiedStates[codeKey] ? <Check size={20} /> : <Copy size={20} />}
    </button>
  );

  const handleBackToComponents = () => {
    navigate('/components');
  };

  return (
    <div className='min-h-screen p-8 font-sans bg-gradient-to-br from-pink-300 to-pink-300 text-gray-800 relative'>
      <BackToTopButton />
      <nav className='mb-8 flex items-center justify-between relative z-10'>
        <button
          onClick={handleBackToComponents}
          className={`flex items-center bg-violet-300 border border-black rounded-2xl shadow-lg transition-all duration-300 px-4 py-2 hover:bg-opacity-20 hover:bg-sky-200 text-black`}
        >
          <ArrowLeft size={20} className='mr-2' />
          Back to Components
        </button>
      </nav>

      <h1 className='text-4xl font-bold mb-8 text-black relative z-10'>
        Glassmorphic Slider Component
      </h1>

      <section
        className={`${getGlassyClasses(20)} p-6 mb-14 text-black relative z-10`}
      >
        <h2 className='text-2xl font-bold mb-4'>Basic Usage</h2>
        <div className={`${getGlassyClasses()} p-4 hover:shadow-xl mb-4`}>
          <input
            type='range'
            min='0'
            max='100'
            value={sliderValue}
            onChange={handleSliderChange}
            className={`${getGlassyClasses(50)} w-full h-2 rounded-lg appearance-none cursor-pointer`}
            style={{
              background: `linear-gradient(90deg, rgba(227, 255, 255, 0.3) ${sliderValue}%, rgba(255, 255, 255, 0.1) ${sliderValue}%)`,
            }}
          />
        </div>
        <pre className='bg-orange-200 text-black p-4 rounded-lg overflow-x-auto relative'>
          {`<input 
  type="range" 
  min="0" 
  max="100" 
  value={${sliderValue}} 
  class="${getGlassyClasses(50)}" 
  style={{ backgroundColor: '${customBgColor}' }} />`}
          <CopyButton
            text={`<input type="range" min="0" max="100" value={${sliderValue}} class="${getGlassyClasses(50)}" style={{ backgroundColor: '${customBgColor}' }} />`}
            codeKey='basicUsage'
          />
        </pre>
      </section>

      <section
        className={`${getGlassyClasses(20)} p-6 mb-14 text-black relative z-10`}
      >
        <h2 className='text-2xl font-bold mb-4'>Props</h2>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='bg-white bg-opacity-20'>
                <th className='text-left p-2'>Prop</th>
                <th className='text-left p-2'>Type</th>
                <th className='text-left p-2'>Default</th>
                <th className='text-left p-2'>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='p-2'>className</td>
                <td className='p-2'>string</td>
                <td className='p-2'>''</td>
                <td className='p-2'>
                  Additional CSS classes to apply to the slider
                </td>
              </tr>
              <tr className='bg-white bg-opacity-10'>
                <td className='p-2'>min</td>
                <td className='p-2'>number</td>
                <td className='p-2'>0</td>
                <td className='p-2'>Minimum value of the slider</td>
              </tr>
              <tr>
                <td className='p-2'>max</td>
                <td className='p-2'>number</td>
                <td className='p-2'>100</td>
                <td className='p-2'>Maximum value of the slider</td>
              </tr>

              <tr className='bg-white bg-opacity-10'>
                <td className='p-2'>defaultValue</td>
                <td className='p-2'>number</td>
                <td className='p-2'>50</td>
                <td className='p-2'>Default value of the slider</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section
        className={`${getGlassyClasses(20)} p-6 mb-8 text-black relative z-10`}
      >
        <h2 className='text-2xl font-bold mb-4'>Custom Styling</h2>
        <div className='mb-12 '>
          <h3 className='text-2xl font-semibold mb-6'>Slider Customization</h3>
          <div
            className={`${getGlassyClasses(10)} p-8 hover:shadow-xl rounded-xl bg-pink-300`}
          >
            <div className='mb-8 '>
              <input
                type='range'
                min='0'
                max='100'
                value={sliderValue}
                onChange={handleSliderChange}
                className={`${getGlassyClasses()} w-full h-2 rounded-lg appearance-none cursor-pointer`}
                style={{
                  background: `linear-gradient(90deg, ${customBgColor} ${sliderValue}%, #cccccc ${sliderValue}%)`,
                }}
              />
            </div>
            <div className='space-y-2'>
              <label className='block text-sm font-medium text-black'>
                Background Color
              </label>
              <input
                type='color'
                value={customBgColor}
                onChange={e => setCustomBgColor(e.target.value)}
                className='w-8 h-8 cursor-pointer border-none bg-transparent'
              />
              <span className='text-sm p-2 font-semibold'>{customBgColor}</span>
              <span className='text-sm p-2 font-semibold'>{customBgColor}</span>
            </div>
            <div className='mt-8'>
              <h4 className='text-xl font-semibold mb-4'>Generated Code</h4>
              <div className='relative'>
                <pre className='bg-orange-200 text-black p-4 rounded-lg overflow-x-auto'>
                  {customCode}
                </pre>
                <CopyButton text={customCode} codeKey='customStyling' />
                <CopyButton text={customCode} codeKey='customStyling' />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SliderDetailsPage;
