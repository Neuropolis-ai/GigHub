'use client';

import React, { useState } from 'react';
import { CheckCircle, XCircle, Lightbulb, Copy, Wand2, BookOpen, Zap, Star, Eye, Camera, Palette, Sparkles, RefreshCw, Settings } from 'lucide-react';

interface PromptExample {
  bad: {
    prompt: string;
    description: string;
    result: string;
  };
  good: {
    prompt: string;
    description: string;
    result: string;
  };
  category: string;
  icon: React.ReactNode;
}

interface MagicWord {
  word: string;
  category: 'качество' | 'стиль' | 'освещение' | 'композиция' | 'техника';
  description: string;
  example: string;
}

const promptExamples: PromptExample[] = [
  {
    category: 'Портреты',
    icon: <Camera className="w-6 h-6" />,
    bad: {
      prompt: 'кошка',
      description: 'Слишком общий промт',
      result: 'Простое изображение кошки без деталей'
    },
    good: {
      prompt: 'photorealistic portrait of a fluffy ginger cat, sitting on a sunlit windowsill, detailed fur texture, bokeh background, cinematic lighting, 85mm lens',
      description: 'Детальное описание с техническими параметрами',
      result: 'Профессиональный портрет с отличной детализацией'
    }
  },
  {
    category: 'Пейзажи',
    icon: <Eye className="w-6 h-6" />,
    bad: {
      prompt: 'лес',
      description: 'Нет контекста и настроения',
      result: 'Обычная фотография леса'
    },
    good: {
      prompt: 'mystical forest at dawn, volumetric light rays through ancient trees, moss-covered stones, mist, ethereal atmosphere, fantasy art style, highly detailed',
      description: 'Атмосферное описание с эмоциональным контекстом',
      result: 'Волшебный пейзаж с превосходной атмосферой'
    }
  },
  {
    category: 'Концепт-арт',
    icon: <Palette className="w-6 h-6" />,
    bad: {
      prompt: 'робот',
      description: 'Нет стиля и контекста',
      result: 'Стандартный образ робота'
    },
    good: {
      prompt: 'futuristic humanoid robot, sleek metallic design, glowing blue accents, cyberpunk aesthetic, studio lighting, concept art style, 4K, ultra detailed',
      description: 'Конкретный стиль и качественные характеристики',
      result: 'Профессиональный концепт-арт робота'
    }
  }
];

const magicWords: MagicWord[] = [
  // Качество
  { word: 'highly detailed', category: 'качество', description: 'Максимальная детализация', example: 'highly detailed portrait' },
  { word: 'photorealistic', category: 'качество', description: 'Фотографическое качество', example: 'photorealistic landscape' },
  { word: '4K, 8K', category: 'качество', description: 'Высокое разрешение', example: 'beautiful sunset, 8K' },
  { word: 'ultra detailed', category: 'качество', description: 'Сверхдетализация', example: 'ultra detailed texture' },
  
  // Стиль
  { word: 'concept art', category: 'стиль', description: 'Стиль концепт-арта', example: 'robot concept art' },
  { word: 'digital painting', category: 'стиль', description: 'Цифровая живопись', example: 'forest digital painting' },
  { word: 'oil painting', category: 'стиль', description: 'Масляная живопись', example: 'portrait oil painting' },
  { word: 'anime style', category: 'стиль', description: 'Стиль аниме', example: 'girl anime style' },
  
  // Освещение
  { word: 'cinematic lighting', category: 'освещение', description: 'Кинематографическое освещение', example: 'portrait cinematic lighting' },
  { word: 'golden hour', category: 'освещение', description: 'Золотой час', example: 'landscape golden hour' },
  { word: 'volumetric lighting', category: 'освещение', description: 'Объемное освещение', example: 'forest volumetric lighting' },
  { word: 'studio lighting', category: 'освещение', description: 'Студийное освещение', example: 'product studio lighting' },
  
  // Композиция
  { word: 'close-up', category: 'композиция', description: 'Крупный план', example: 'close-up portrait' },
  { word: 'wide angle', category: 'композиция', description: 'Широкий угол', example: 'wide angle landscape' },
  { word: 'bokeh background', category: 'композиция', description: 'Размытый фон', example: 'portrait bokeh background' },
  { word: 'rule of thirds', category: 'композиция', description: 'Правило третей', example: 'composition rule of thirds' },
  
  // Техника
  { word: 'Unreal Engine', category: 'техника', description: 'Движок для 3D', example: 'scene Unreal Engine' },
  { word: 'octane render', category: 'техника', description: 'Качественный рендер', example: 'model octane render' },
  { word: 'ray tracing', category: 'техника', description: 'Трассировка лучей', example: 'interior ray tracing' },
  { word: 'HDR', category: 'техника', description: 'Расширенный динамический диапазон', example: 'landscape HDR' }
];

const PromptMasteryGuide: React.FC = () => {
  const [activeExample, setActiveExample] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('все');
  const [copiedWord, setCopiedWord] = useState<string>('');

  const categories = ['все', 'качество', 'стиль', 'освещение', 'композиция', 'техника'];

  const filteredMagicWords = selectedCategory === 'все' 
    ? magicWords 
    : magicWords.filter(word => word.category === selectedCategory);

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedWord(text);
    setTimeout(() => setCopiedWord(''), 2000);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'качество': 'bg-green-100 text-green-800 border-green-200',
      'стиль': 'bg-purple-100 text-purple-800 border-purple-200',
      'освещение': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'композиция': 'bg-blue-100 text-blue-800 border-blue-200',
      'техника': 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="container mx-auto px-6">
        {/* Заголовок секции */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-purple-100 rounded-full px-4 py-2 mb-6">
            <BookOpen className="w-5 h-5 text-purple-600" />
            <span className="text-purple-600 font-medium">Эксклюзивный гайд</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Как писать промты, которые работают: мини-гайд для новичков
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Превратите простые идеи в потрясающие изображения с помощью правильных промптов. 
            Изучите секреты профессионалов!
          </p>
        </div>

        {/* Сравнительный блок "Плохо / Хорошо" */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center flex items-center justify-center">
            <Wand2 className="w-6 h-6 mr-2 text-purple-600" />
            Сравнение: простой VS детальный промт
          </h3>

          {/* Переключатель примеров */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-xl p-1 shadow-lg border border-gray-200">
              {promptExamples.map((example, index) => (
                <button
                  key={index}
                  onClick={() => setActiveExample(index)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    activeExample === index
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-purple-600'
                  }`}
                >
                  {example.icon}
                  <span className="font-medium">{example.category}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Активный пример */}
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Плохой пример */}
            <div className="bg-white rounded-2xl p-8 border-2 border-red-200 shadow-lg relative">
              <div className="absolute top-4 right-4">
                <div className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                  <XCircle className="w-4 h-4 mr-1" />
                  Плохо
                </div>
              </div>
              
              <h4 className="text-xl font-bold text-gray-900 mb-4">❌ Простой промт</h4>
              
              <div className="bg-red-50 rounded-lg p-4 mb-4 border border-red-200">
                <p className="font-mono text-red-800 text-lg">
                  "{promptExamples[activeExample].bad.prompt}"
                </p>
              </div>
              
              <p className="text-gray-600 mb-4">{promptExamples[activeExample].bad.description}</p>
              
              <div className="bg-gray-100 rounded-lg p-4 text-center text-gray-600 italic">
                📷 {promptExamples[activeExample].bad.result}
              </div>
            </div>

            {/* Хороший пример */}
            <div className="bg-white rounded-2xl p-8 border-2 border-green-200 shadow-lg relative">
              <div className="absolute top-4 right-4">
                <div className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Хорошо
                </div>
              </div>
              
              <h4 className="text-xl font-bold text-gray-900 mb-4">✅ Детальный промт</h4>
              
              <div className="bg-green-50 rounded-lg p-4 mb-4 border border-green-200">
                <p className="font-mono text-green-800 text-sm leading-relaxed">
                  "{promptExamples[activeExample].good.prompt}"
                </p>
                <button
                  onClick={() => copyToClipboard(promptExamples[activeExample].good.prompt)}
                  className="mt-2 text-xs text-green-600 hover:text-green-800 flex items-center"
                >
                  <Copy className="w-3 h-3 mr-1" />
                  Скопировать
                </button>
              </div>
              
              <p className="text-gray-600 mb-4">{promptExamples[activeExample].good.description}</p>
              
              <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-4 text-center text-gray-700 font-medium">
                🌟 {promptExamples[activeExample].good.result}
              </div>
            </div>
          </div>
        </div>

        {/* Секция "Волшебные слова" */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center flex items-center justify-center">
            <Lightbulb className="w-6 h-6 mr-2 text-yellow-500" />
            Волшебные слова для промптов
          </h3>

          {/* Фильтр по категориям */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-purple-50 border border-gray-200'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Сетка волшебных слов */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-7xl mx-auto">
            {filteredMagicWords.map((magicWord, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                onClick={() => copyToClipboard(magicWord.word)}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animation: 'fadeInUp 0.5s ease-out forwards'
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(magicWord.category)}`}>
                    {magicWord.category}
                  </span>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    {copiedWord === magicWord.word ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                </div>
                
                <h4 className="font-bold text-gray-900 mb-2 font-mono text-sm">
                  {magicWord.word}
                </h4>
                
                <p className="text-gray-600 text-xs mb-2 leading-relaxed">
                  {magicWord.description}
                </p>
                
                <div className="bg-gray-50 rounded-lg p-2 text-xs text-gray-700 italic">
                  💡 {magicWord.example}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Практические советы */}
        <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center">
            <Zap className="w-6 h-6 mr-2 text-blue-500" />
            Профессиональные советы
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 text-lg">📝 Структура промта:</h4>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-start space-x-2">
                  <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                  <span><strong>Основной объект:</strong> "портрет девушки"</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                  <span><strong>Детали и стиль:</strong> "реалистично, детализированно"</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                  <span><strong>Освещение:</strong> "мягкое освещение, золотой час"</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">4</span>
                  <span><strong>Качество:</strong> "4K, высокое разрешение"</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 text-lg">⚡ Секретные приемы:</h4>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                  <strong>💡 Используйте имена художников:</strong><br />
                  "in style of Van Gogh", "by Greg Rutkowski"
                </div>
                <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                  <strong>📸 Указывайте параметры камеры:</strong><br />
                  "50mm lens", "f/1.4", "shallow depth of field"
                </div>
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <strong>🎬 Добавляйте эмоции:</strong><br />
                  "serene", "dramatic", "mysterious", "joyful"
                </div>
                <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                  <strong>🔧 Технические улучшения:</strong><br />
                  "trending on ArtStation", "award winning photography"
                </div>
              </div>
            </div>
          </div>

          {/* CTA блок */}
          <div className="mt-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 text-center border border-purple-200">
            <h4 className="font-bold text-gray-900 text-lg mb-2">
              🚀 Готовы создать шедевр?
            </h4>
            <p className="text-gray-600 mb-4">
              Примените эти знания на практике с лучшими нейросетями из нашего рейтинга!
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <span className="bg-white px-3 py-1 rounded-full text-sm text-gray-700 border border-gray-200">
                #PromptEngineering
              </span>
              <span className="bg-white px-3 py-1 rounded-full text-sm text-gray-700 border border-gray-200">
                #AIArt
              </span>
              <span className="bg-white px-3 py-1 rounded-full text-sm text-gray-700 border border-gray-200">
                #НейросетиДляНовичков
              </span>
            </div>
          </div>
        </div>

        {/* Интерактивный генератор промптов */}
        <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200 max-w-6xl mx-auto mt-8">
          <SmartPromptGenerator />
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

// Улучшенный компонент генератора промптов
const SmartPromptGenerator: React.FC = (): React.ReactElement => {
  const [selectedStyle, setSelectedStyle] = useState('фотореализм');
  const [selectedSubject, setSelectedSubject] = useState('портрет');
  const [selectedMood, setSelectedMood] = useState('яркий');
  const [selectedQuality, setSelectedQuality] = useState('высокое качество');
  const [selectedLighting, setSelectedLighting] = useState('естественное освещение');
  const [selectedArtist, setSelectedArtist] = useState('нет');
  const [selectedCamera, setSelectedCamera] = useState('нет');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [englishPrompt, setEnglishPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const styles = [
    { value: 'фотореализм', eng: 'photorealistic', icon: '📸' },
    { value: 'аниме', eng: 'anime style', icon: '🎌' },
    { value: 'цифровое искусство', eng: 'digital art', icon: '💻' },
    { value: 'живопись маслом', eng: 'oil painting', icon: '🎨' },
    { value: 'акварель', eng: 'watercolor', icon: '🖌️' },
    { value: 'карандашный эскиз', eng: 'pencil sketch', icon: '✏️' },
    { value: '3D рендер', eng: '3D render', icon: '🎮' },
    { value: 'пиксель-арт', eng: 'pixel art', icon: '🕹️' }
  ];

  const subjects = [
    { value: 'портрет', eng: 'portrait', icon: '👤' },
    { value: 'пейзаж', eng: 'landscape', icon: '🌄' },
    { value: 'животное', eng: 'animal', icon: '🦊' },
    { value: 'архитектура', eng: 'architecture', icon: '🏛️' },
    { value: 'фэнтези', eng: 'fantasy', icon: '🧙‍♂️' },
    { value: 'автомобиль', eng: 'car', icon: '🚗' },
    { value: 'еда', eng: 'food', icon: '🍎' },
    { value: 'космос', eng: 'space', icon: '🌌' },
    { value: 'подводный мир', eng: 'underwater', icon: '🐠' },
    { value: 'город', eng: 'cityscape', icon: '🏙️' }
  ];

  const moods = [
    { value: 'яркий', eng: 'bright', icon: '☀️' },
    { value: 'темный', eng: 'dark', icon: '🌙' },
    { value: 'мечтательный', eng: 'dreamy', icon: '💭' },
    { value: 'драматичный', eng: 'dramatic', icon: '⚡' },
    { value: 'спокойный', eng: 'serene', icon: '🕊️' },
    { value: 'мистический', eng: 'mystical', icon: '🔮' },
    { value: 'романтичный', eng: 'romantic', icon: '💕' },
    { value: 'энергичный', eng: 'energetic', icon: '🔥' },
    { value: 'меланхоличный', eng: 'melancholic', icon: '🍂' }
  ];

  const qualities = [
    { value: 'высокое качество', eng: 'high quality', icon: '⭐' },
    { value: '4K', eng: '4K', icon: '📺' },
    { value: '8K', eng: '8K', icon: '🖥️' },
    { value: 'гиперреалистично', eng: 'hyperrealistic', icon: '🔍' },
    { value: 'детализированно', eng: 'highly detailed', icon: '🎯' },
    { value: 'кинематографично', eng: 'cinematic', icon: '🎬' },
    { value: 'профессиональное фото', eng: 'professional photography', icon: '📷' },
    { value: 'студийное качество', eng: 'studio quality', icon: '🏢' }
  ];

  const lightings = [
    { value: 'естественное освещение', eng: 'natural lighting', icon: '🌞' },
    { value: 'студийное освещение', eng: 'studio lighting', icon: '💡' },
    { value: 'золотой час', eng: 'golden hour', icon: '🌅' },
    { value: 'синий час', eng: 'blue hour', icon: '🌆' },
    { value: 'неоновое освещение', eng: 'neon lighting', icon: '🌈' },
    { value: 'драматичные тени', eng: 'dramatic shadows', icon: '🎭' },
    { value: 'мягкий свет', eng: 'soft light', icon: '🕯️' }
  ];

  const artists = [
    { value: 'нет', eng: '', icon: '❌' },
    { value: 'Greg Rutkowski', eng: 'by Greg Rutkowski', icon: '🎨' },
    { value: 'Artgerm', eng: 'by Artgerm', icon: '✨' },
    { value: 'Van Gogh', eng: 'in style of Van Gogh', icon: '🌻' },
    { value: 'Picasso', eng: 'in style of Picasso', icon: '🎭' },
    { value: 'Studio Ghibli', eng: 'Studio Ghibli style', icon: '🌸' }
  ];

  const cameras = [
    { value: 'нет', eng: '', icon: '❌' },
    { value: '85mm lens', eng: '85mm lens', icon: '📸' },
    { value: '50mm lens', eng: '50mm lens', icon: '📷' },
    { value: 'wide angle', eng: 'wide angle lens', icon: '🌐' },
    { value: 'macro', eng: 'macro photography', icon: '🔍' },
    { value: 'bokeh', eng: 'shallow depth of field, bokeh', icon: '✨' }
  ];

  const generatePrompt = async () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const styleObj = styles.find(s => s.value === selectedStyle);
      const subjectObj = subjects.find(s => s.value === selectedSubject);
      const moodObj = moods.find(m => m.value === selectedMood);
      const qualityObj = qualities.find(q => q.value === selectedQuality);
      const lightingObj = lightings.find(l => l.value === selectedLighting);
      const artistObj = artists.find(a => a.value === selectedArtist);
      const cameraObj = cameras.find(c => c.value === selectedCamera);

      // Русский промпт
      const russianParts = [
        subjectObj?.value,
        `в стиле ${styleObj?.value}`,
        `${moodObj?.value} настроение`,
        qualityObj?.value,
        lightingObj?.value,
        artistObj?.value !== 'нет' ? `стиль ${artistObj?.value}` : '',
        cameraObj?.value !== 'нет' ? cameraObj?.value : '',
        'детализированно, профессиональная работа'
      ].filter(Boolean);

      // Английский промпт
      const englishParts = [
        subjectObj?.eng,
        styleObj?.eng,
        `${moodObj?.eng} mood`,
        qualityObj?.eng,
        lightingObj?.eng,
        artistObj?.eng,
        cameraObj?.eng,
        'highly detailed, masterpiece'
      ].filter(Boolean);

      setGeneratedPrompt(russianParts.join(', '));
      setEnglishPrompt(englishParts.join(', '));
      setIsGenerating(false);
    }, 1500);
  };

  const copyToClipboard = async (text: string, type: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  const randomizeSettings = () => {
    setSelectedStyle(styles[Math.floor(Math.random() * styles.length)].value);
    setSelectedSubject(subjects[Math.floor(Math.random() * subjects.length)].value);
    setSelectedMood(moods[Math.floor(Math.random() * moods.length)].value);
    setSelectedQuality(qualities[Math.floor(Math.random() * qualities.length)].value);
    setSelectedLighting(lightings[Math.floor(Math.random() * lightings.length)].value);
  };

  const promptExamples = [
    {
      rus: "портрет девушки в стиле аниме, мечтательное настроение",
      eng: "anime girl portrait, dreamy mood, highly detailed"
    },
    {
      rus: "пейзаж космоса в стиле цифрового искусства, драматичное настроение", 
      eng: "space landscape digital art, dramatic mood, 4K"
    },
    {
      rus: "автомобиль в стиле фотореализма, энергичное настроение",
      eng: "photorealistic car, energetic mood, studio lighting"
    }
  ];

  return (
    <div>
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center justify-center">
          <Sparkles className="w-6 h-6 mr-2 text-purple-600" />
          Интерактивный генератор промптов
          <span className="ml-2 text-xs bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-3 py-1 rounded-full border border-purple-200">
            AI-powered
          </span>
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Создавайте профессиональные промпты за секунды! Выберите параметры или воспользуйтесь случайной генерацией.
        </p>
      </div>

      {/* Основные параметры */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Стиль */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700 flex items-center">
            🎨 Стиль изображения
          </label>
          <select 
            value={selectedStyle} 
            onChange={(e) => setSelectedStyle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white shadow-sm hover:shadow-md transition-all"
          >
            {styles.map(style => (
              <option key={style.value} value={style.value}>
                {style.icon} {style.value}
              </option>
            ))}
          </select>
        </div>

        {/* Предмет */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700 flex items-center">
            🖼️ Основной объект
          </label>
          <select 
            value={selectedSubject} 
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white shadow-sm hover:shadow-md transition-all"
          >
            {subjects.map(subject => (
              <option key={subject.value} value={subject.value}>
                {subject.icon} {subject.value}
              </option>
            ))}
          </select>
        </div>

        {/* Настроение */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700 flex items-center">
            🎭 Настроение
          </label>
          <select 
            value={selectedMood} 
            onChange={(e) => setSelectedMood(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white shadow-sm hover:shadow-md transition-all"
          >
            {moods.map(mood => (
              <option key={mood.value} value={mood.value}>
                {mood.icon} {mood.value}
              </option>
            ))}
          </select>
        </div>

        {/* Качество */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700 flex items-center">
            ⭐ Качество
          </label>
          <select 
            value={selectedQuality} 
            onChange={(e) => setSelectedQuality(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white shadow-sm hover:shadow-md transition-all"
          >
            {qualities.map(quality => (
              <option key={quality.value} value={quality.value}>
                {quality.icon} {quality.value}
              </option>
            ))}
          </select>
        </div>

        {/* Освещение */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700 flex items-center">
            💡 Освещение
          </label>
          <select 
            value={selectedLighting} 
            onChange={(e) => setSelectedLighting(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white shadow-sm hover:shadow-md transition-all"
          >
            {lightings.map(lighting => (
              <option key={lighting.value} value={lighting.value}>
                {lighting.icon} {lighting.value}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Дополнительные настройки */}
      <div className="mb-8">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center space-x-2 text-purple-600 hover:text-purple-800 font-medium transition-colors mb-4"
        >
          <Settings className="w-4 h-4" />
          <span>{showAdvanced ? 'Скрыть' : 'Показать'} дополнительные настройки</span>
        </button>

        {showAdvanced && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-xl">
            {/* Художник */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 flex items-center">
                🎨 Стиль художника
              </label>
              <select 
                value={selectedArtist} 
                onChange={(e) => setSelectedArtist(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white shadow-sm"
              >
                {artists.map(artist => (
                  <option key={artist.value} value={artist.value}>
                    {artist.icon} {artist.value}
                  </option>
                ))}
              </select>
            </div>

            {/* Камера */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 flex items-center">
                📸 Параметры камеры
              </label>
              <select 
                value={selectedCamera} 
                onChange={(e) => setSelectedCamera(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white shadow-sm"
              >
                {cameras.map(camera => (
                  <option key={camera.value} value={camera.value}>
                    {camera.icon} {camera.value}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Кнопки управления */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <button 
          onClick={generatePrompt}
          disabled={isGenerating}
          className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span>Генерируем...</span>
            </>
          ) : (
            <>
              <Wand2 className="w-5 h-5" />
              <span>Сгенерировать промпт</span>
            </>
          )}
        </button>

        <button 
          onClick={randomizeSettings}
          className="px-6 py-4 border-2 border-purple-600 text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-all flex items-center justify-center space-x-2"
        >
          <RefreshCw className="w-5 h-5" />
          <span>Случайные настройки</span>
        </button>
      </div>

      {/* Результаты */}
      {(generatedPrompt || englishPrompt) && (
        <div className="space-y-4 mb-8">
          {/* Русский промпт */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-gray-900 flex items-center">
                🇷🇺 Промпт на русском языке
              </h4>
              <button 
                onClick={() => copyToClipboard(generatedPrompt, 'russian')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                  copied === 'russian'
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                }`}
              >
                {copied === 'russian' ? '✓ Скопировано!' : '📋 Скопировать'}
              </button>
            </div>
            <p className="text-gray-800 italic leading-relaxed">
              "{generatedPrompt}"
            </p>
          </div>

          {/* Английский промпт */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-gray-900 flex items-center">
                🇺🇸 Промпт на английском языке
              </h4>
              <button 
                onClick={() => copyToClipboard(englishPrompt, 'english')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                  copied === 'english'
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-green-100 text-green-800 hover:bg-green-200'
                }`}
              >
                {copied === 'english' ? '✓ Скопировано!' : '📋 Скопировать'}
              </button>
            </div>
            <p className="text-gray-800 italic leading-relaxed font-mono text-sm">
              "{englishPrompt}"
            </p>
          </div>
        </div>
      )}

      {/* Примеры промптов */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          💡 Примеры готовых промптов
        </h4>
        <div className="grid md:grid-cols-3 gap-4">
          {promptExamples.map((example, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all cursor-pointer group">
              <div className="space-y-3">
                <div 
                  onClick={() => setGeneratedPrompt(example.rus)}
                  className="bg-blue-50 p-3 rounded-lg border border-blue-200 group-hover:border-blue-300 transition-all"
                >
                  <span className="text-xs text-blue-600 font-medium">🇷🇺 Русский:</span>
                  <p className="text-sm text-gray-700 mt-1">"{example.rus}"</p>
                </div>
                <div 
                  onClick={() => setEnglishPrompt(example.eng)}
                  className="bg-green-50 p-3 rounded-lg border border-green-200 group-hover:border-green-300 transition-all"
                >
                  <span className="text-xs text-green-600 font-medium">🇺🇸 English:</span>
                  <p className="text-sm text-gray-700 mt-1 font-mono">"{example.eng}"</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromptMasteryGuide; 