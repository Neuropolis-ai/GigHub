'use client';

import React, { useState } from 'react';
import { CheckCircle, XCircle, Lightbulb, Copy, Wand2, BookOpen, Zap, Star, Eye, Camera, Palette, Sparkles, RefreshCw, Settings, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <section id="prompt-guide" className="py-20 bg-gradient-to-br from-background via-accent-primary/5 to-accent-secondary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок секции */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-accent-primary/20 mb-8 shadow-lg">
            <BookOpen className="w-5 h-5 text-accent-primary" />
            <span className="text-accent-primary font-bold">ЭКСКЛЮЗИВНЫЙ ГАЙД</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6 leading-tight">
            Как писать промты, которые работают:{' '}
            <span className="text-gradient bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
              мини-гайд
            </span>
            {' '}для новичков
          </h2>
          <p className="text-xl text-text-secondary max-w-4xl mx-auto leading-relaxed">
            Превратите простые идеи в потрясающие изображения с помощью правильных промптов. 
            Изучите секреты профессионалов!
          </p>
        </motion.div>

        {/* Сравнительный блок "Плохо / Хорошо" */}
        <div className="mb-20">
          <motion.h3 
            className="text-3xl font-bold text-text-primary mb-8 text-center flex items-center justify-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Wand2 className="w-7 h-7 text-accent-primary" />
            Сравнение: простой VS детальный промт
          </motion.h3>

          {/* Переключатель примеров */}
          <motion.div 
            className="flex justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-xl border border-accent-primary/20">
              {promptExamples.map((example, index) => (
                <button
                  key={index}
                  onClick={() => setActiveExample(index)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                    activeExample === index
                      ? 'bg-gradient-to-r from-accent-primary to-accent-secondary text-white shadow-lg transform scale-105'
                      : 'text-text-secondary hover:text-accent-primary hover:bg-accent-primary/5'
                  }`}
                >
                  {example.icon}
                  <span className="font-medium">{example.category}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Активный пример */}
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Плохой пример */}
            <motion.div 
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border-2 border-red-200/60 shadow-xl relative overflow-hidden"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-100/50 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute top-4 right-4">
                <div className="bg-red-50 text-red-600 px-4 py-2 rounded-full text-sm font-semibold flex items-center border border-red-200">
                  <XCircle className="w-4 h-4 mr-2" />
                  Плохо
                </div>
              </div>
              
              <h4 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-2">
                <XCircle className="w-6 h-6 text-red-500" />
                Простой промт
              </h4>
              
              <div className="bg-red-50/80 rounded-xl p-6 mb-6 border border-red-200/60 relative">
                <div className="absolute top-2 right-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                </div>
                <p className="font-mono text-red-800 text-lg font-medium">
                  "{promptExamples[activeExample].bad.prompt}"
                </p>
              </div>
              
              <p className="text-text-secondary mb-6 leading-relaxed">{promptExamples[activeExample].bad.description}</p>
              
              <div className="bg-gray-100/80 rounded-xl p-6 text-center text-text-secondary italic border border-gray-200">
                <Camera className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                {promptExamples[activeExample].bad.result}
              </div>
            </motion.div>

            {/* Хороший пример */}
            <motion.div 
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border-2 border-accent-primary/30 shadow-xl relative overflow-hidden"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute top-4 right-4">
                <div className="bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 text-accent-primary px-4 py-2 rounded-full text-sm font-semibold flex items-center border border-accent-primary/30">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Хорошо
                </div>
              </div>
              
              <h4 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-accent-primary" />
                Детальный промт
              </h4>
              
              <div className="bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 rounded-xl p-6 mb-6 border border-accent-primary/30 relative">
                <div className="absolute top-2 right-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full animate-pulse"></div>
                </div>
                <p className="font-mono text-text-primary text-sm leading-relaxed font-medium">
                  "{promptExamples[activeExample].good.prompt}"
                </p>
                <button
                  onClick={() => copyToClipboard(promptExamples[activeExample].good.prompt)}
                  className="mt-4 text-sm text-accent-primary hover:text-accent-secondary flex items-center gap-2 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  Скопировать промт
                </button>
              </div>
              
              <p className="text-text-secondary mb-6 leading-relaxed">{promptExamples[activeExample].good.description}</p>
              
              <div className="bg-gradient-to-r from-accent-primary/20 to-accent-secondary/20 rounded-xl p-6 text-center text-text-primary font-medium border border-accent-primary/20">
                <Sparkles className="w-8 h-8 mx-auto mb-2 text-accent-primary" />
                {promptExamples[activeExample].good.result}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Секция "Волшебные слова" */}
        <div className="mb-20">
          <motion.h3 
            className="text-3xl font-bold text-text-primary mb-8 text-center flex items-center justify-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Lightbulb className="w-7 h-7 text-accent-secondary" />
            Волшебные слова для промптов
          </motion.h3>

          {/* Фильтр по категориям */}
          <motion.div 
            className="flex flex-wrap justify-center gap-3 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-accent-primary to-accent-secondary text-white shadow-lg transform scale-105'
                    : 'bg-white/80 text-text-secondary hover:text-accent-primary hover:bg-accent-primary/5 border border-accent-primary/20 shadow-sm hover:shadow-md'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </motion.div>

          {/* Сетка волшебных слов */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {filteredMagicWords.map((magicWord, index) => (
              <motion.div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-accent-primary/20 hover:border-accent-primary/40 hover:shadow-xl transition-all duration-300 cursor-pointer group relative overflow-hidden"
                onClick={() => copyToClipboard(magicWord.word)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -2 }}
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-accent-primary/10 to-accent-secondary/10 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-300"></div>
                
                <div className="flex items-center justify-between mb-3">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(magicWord.category)}`}>
                    {magicWord.category}
                  </span>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {copiedWord === magicWord.word ? (
                      <CheckCircle className="w-5 h-5 text-accent-primary" />
                    ) : (
                      <Copy className="w-5 h-5 text-accent-primary/60" />
                    )}
                  </div>
                </div>
                
                <h4 className="font-bold text-text-primary mb-3 font-mono text-base group-hover:text-accent-primary transition-colors">
                  {magicWord.word}
                </h4>
                
                <p className="text-text-secondary text-sm mb-4 leading-relaxed">
                  {magicWord.description}
                </p>
                
                <div className="bg-accent-primary/5 rounded-lg p-3 text-sm text-text-secondary italic border border-accent-primary/10">
                  <Lightbulb className="w-4 h-4 inline mr-2 text-accent-secondary" />
                  {magicWord.example}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Практические советы */}
        <motion.div 
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-2xl border border-accent-primary/20 max-w-6xl mx-auto mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-text-primary mb-8 text-center flex items-center justify-center gap-3">
            <Zap className="w-7 h-7 text-accent-secondary" />
            Профессиональные советы
          </h3>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h4 className="font-bold text-text-primary text-xl flex items-center gap-2">
                <Settings className="w-6 h-6 text-accent-primary" />
                Структура промта:
              </h4>
              <div className="space-y-4 text-sm text-text-secondary">
                {[
                  { num: 1, title: 'Основной объект:', desc: '"портрет девушки"' },
                  { num: 2, title: 'Детали и стиль:', desc: '"реалистично, детализированно"' },
                  { num: 3, title: 'Освещение:', desc: '"мягкое освещение, золотой час"' },
                  { num: 4, title: 'Качество:', desc: '"4K, высокое разрешение"' }
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    className="flex items-start space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <span className="w-8 h-8 bg-gradient-to-r from-accent-primary to-accent-secondary text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {item.num}
                    </span>
                    <div>
                      <span className="font-semibold text-text-primary">{item.title}</span>{' '}
                      <span>{item.desc}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="font-bold text-text-primary text-xl flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-accent-secondary" />
                Секретные приемы:
              </h4>
              <div className="space-y-4 text-sm">
                {[
                  { 
                    icon: <Lightbulb className="w-5 h-5 text-accent-primary" />, 
                    title: 'Используйте имена художников:', 
                    desc: '"in style of Van Gogh", "by Greg Rutkowski"',
                    bg: 'from-accent-primary/10 to-accent-primary/5',
                    border: 'border-accent-primary/20'
                  },
                  { 
                    icon: <Camera className="w-5 h-5 text-accent-secondary" />, 
                    title: 'Указывайте параметры камеры:', 
                    desc: '"50mm lens", "f/1.4", "shallow depth of field"',
                    bg: 'from-accent-secondary/10 to-accent-secondary/5',
                    border: 'border-accent-secondary/20'
                  },
                  { 
                    icon: <Heart className="w-5 h-5 text-accent-primary" />, 
                    title: 'Добавляйте эмоции:', 
                    desc: '"serene", "dramatic", "mysterious", "joyful"',
                    bg: 'from-accent-primary/10 to-accent-secondary/10',
                    border: 'border-accent-primary/20'
                  },
                  { 
                    icon: <Settings className="w-5 h-5 text-accent-secondary" />, 
                    title: 'Технические улучшения:', 
                    desc: '"trending on ArtStation", "award winning photography"',
                    bg: 'from-accent-secondary/10 to-accent-primary/10',
                    border: 'border-accent-secondary/20'
                  }
                ].map((tip, idx) => (
                  <motion.div 
                    key={idx}
                    className={`bg-gradient-to-r ${tip.bg} p-4 rounded-xl border ${tip.border}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <div className="flex items-start gap-3">
                      {tip.icon}
                      <div>
                        <div className="font-semibold text-text-primary mb-1">{tip.title}</div>
                        <div className="text-text-secondary">{tip.desc}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA блок */}
          <motion.div 
            className="mt-12 bg-gradient-to-r from-accent-primary/20 to-accent-secondary/20 rounded-2xl p-8 text-center border border-accent-primary/30"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="font-bold text-text-primary text-2xl mb-3 flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6 text-accent-primary" />
              Готовы создать шедевр?
            </h4>
            <p className="text-text-secondary mb-6 text-lg">
              Примените эти знания на практике с лучшими нейросетями из нашего рейтинга!
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {['#PromptEngineering', '#AIArt', '#НейросетиДляНовичков'].map((tag, idx) => (
                <span key={idx} className="bg-white/80 px-4 py-2 rounded-full text-sm text-text-secondary border border-accent-primary/20 shadow-sm">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Интерактивный генератор промптов */}
        <motion.div 
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-2xl border border-accent-primary/20 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <SmartPromptGenerator />
        </motion.div>
      </div>
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
  const [additionalText, setAdditionalText] = useState('');

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
        <h3 className="text-3xl font-bold text-text-primary mb-4 flex items-center justify-center gap-3">
          <Sparkles className="w-7 h-7 text-accent-primary" />
          Интерактивный генератор промптов
          <span className="ml-2 text-sm bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 text-accent-primary px-4 py-2 rounded-full border border-accent-primary/20 shadow-sm">
            AI-powered
          </span>
        </h3>
        <p className="text-text-secondary max-w-3xl mx-auto text-lg leading-relaxed">
          Создавайте профессиональные промпты за секунды! Выберите параметры или воспользуйтесь случайной генерацией.
        </p>
      </div>

      {/* Основные параметры */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Стиль */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-text-primary flex items-center gap-2">
            <Palette className="w-4 h-4 text-accent-primary" />
            Стиль изображения
          </label>
          <select 
            value={selectedStyle} 
            onChange={(e) => setSelectedStyle(e.target.value)}
            className="w-full p-4 border border-accent-primary/30 rounded-xl focus:ring-2 focus:ring-accent-primary focus:border-accent-primary bg-white/80 shadow-sm hover:shadow-md transition-all backdrop-blur-sm"
          >
            {styles.map(style => (
              <option key={style.value} value={style.value}>
                {style.icon} {style.value}
              </option>
            ))}
          </select>
        </div>

        {/* Предмет */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-text-primary flex items-center gap-2">
            <Camera className="w-4 h-4 text-accent-primary" />
            Основной объект
          </label>
          <select 
            value={selectedSubject} 
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full p-4 border border-accent-primary/30 rounded-xl focus:ring-2 focus:ring-accent-primary focus:border-accent-primary bg-white/80 shadow-sm hover:shadow-md transition-all backdrop-blur-sm"
          >
            {subjects.map(subject => (
              <option key={subject.value} value={subject.value}>
                {subject.icon} {subject.value}
              </option>
            ))}
          </select>
        </div>

        {/* Настроение */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-text-primary flex items-center gap-2">
            <Heart className="w-4 h-4 text-accent-secondary" />
            Настроение
          </label>
          <select 
            value={selectedMood} 
            onChange={(e) => setSelectedMood(e.target.value)}
            className="w-full p-4 border border-accent-primary/30 rounded-xl focus:ring-2 focus:ring-accent-primary focus:border-accent-primary bg-white/80 shadow-sm hover:shadow-md transition-all backdrop-blur-sm"
          >
            {moods.map(mood => (
              <option key={mood.value} value={mood.value}>
                {mood.icon} {mood.value}
              </option>
            ))}
          </select>
        </div>

        {/* Качество */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-text-primary flex items-center gap-2">
            <Star className="w-4 h-4 text-accent-primary" />
            Качество
          </label>
          <select 
            value={selectedQuality} 
            onChange={(e) => setSelectedQuality(e.target.value)}
            className="w-full p-4 border border-accent-primary/30 rounded-xl focus:ring-2 focus:ring-accent-primary focus:border-accent-primary bg-white/80 shadow-sm hover:shadow-md transition-all backdrop-blur-sm"
          >
            {qualities.map(quality => (
              <option key={quality.value} value={quality.value}>
                {quality.icon} {quality.value}
              </option>
            ))}
          </select>
        </div>

        {/* Освещение */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-text-primary flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-accent-secondary" />
            Освещение
          </label>
          <select 
            value={selectedLighting} 
            onChange={(e) => setSelectedLighting(e.target.value)}
            className="w-full p-4 border border-accent-primary/30 rounded-xl focus:ring-2 focus:ring-accent-primary focus:border-accent-primary bg-white/80 shadow-sm hover:shadow-md transition-all backdrop-blur-sm"
          >
            {lightings.map(lighting => (
              <option key={lighting.value} value={lighting.value}>
                {lighting.icon} {lighting.value}
              </option>
            ))}
          </select>
        </div>

        {/* Художник */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-text-primary flex items-center gap-2">
            <Palette className="w-4 h-4 text-accent-primary" />
            Стиль художника
          </label>
          <select 
            value={selectedArtist} 
            onChange={(e) => setSelectedArtist(e.target.value)}
            className="w-full p-4 border border-accent-primary/30 rounded-xl focus:ring-2 focus:ring-accent-primary focus:border-accent-primary bg-white/80 shadow-sm hover:shadow-md transition-all backdrop-blur-sm"
          >
            {artists.map(artist => (
              <option key={artist.value} value={artist.value}>
                {artist.icon} {artist.value}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Дополнительные параметры */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Камера */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-text-primary flex items-center gap-2">
            <Camera className="w-4 h-4 text-accent-secondary" />
            Параметры камеры
          </label>
          <select 
            value={selectedCamera} 
            onChange={(e) => setSelectedCamera(e.target.value)}
            className="w-full p-4 border border-accent-primary/30 rounded-xl focus:ring-2 focus:ring-accent-primary focus:border-accent-primary bg-white/80 shadow-sm hover:shadow-md transition-all backdrop-blur-sm"
          >
            {cameras.map(camera => (
              <option key={camera.value} value={camera.value}>
                {camera.icon} {camera.value}
              </option>
            ))}
          </select>
        </div>

        {/* Дополнительный текст */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-text-primary flex items-center gap-2">
            <Settings className="w-4 h-4 text-accent-primary" />
            Дополнительные детали
          </label>
          <input 
            type="text" 
            value={additionalText}
            onChange={(e) => setAdditionalText(e.target.value)}
            placeholder="Добавьте свои детали..."
            className="w-full p-4 border border-accent-primary/30 rounded-xl focus:ring-2 focus:ring-accent-primary focus:border-accent-primary bg-white/80 shadow-sm hover:shadow-md transition-all backdrop-blur-sm placeholder-text-secondary/60"
          />
        </div>
      </div>

      {/* Кнопки управления */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <button
          onClick={generatePrompt}
          className="px-8 py-4 bg-gradient-to-r from-accent-primary to-accent-secondary text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
        >
          <Sparkles className="w-5 h-5" />
          Создать промт
        </button>
        
        <button
          onClick={randomizeSettings}
          className="px-8 py-4 bg-white/80 border border-accent-primary/30 text-accent-primary rounded-xl font-semibold hover:bg-accent-primary/5 hover:shadow-md transition-all duration-300 flex items-center gap-2 backdrop-blur-sm"
        >
          <RefreshCw className="w-5 h-5" />
          Случайно
        </button>
      </div>

      {(generatedPrompt || englishPrompt) && (
        <div className="space-y-6 mb-8">
          {/* Русский промпт */}
          <div className="bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 rounded-2xl p-6 border border-accent-primary/30 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-text-primary flex items-center gap-2 text-lg">
                <span className="text-lg">🇷🇺</span>
                Промпт на русском языке
              </h4>
              <button 
                onClick={() => copyToClipboard(generatedPrompt, 'russian')}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  copied === 'russian'
                    ? 'bg-accent-primary/20 text-accent-primary border border-accent-primary/30' 
                    : 'bg-white/80 text-accent-primary hover:bg-accent-primary/5 border border-accent-primary/20 hover:border-accent-primary/40'
                }`}
              >
                {copied === 'russian' ? (
                  <span className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Скопировано!
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Copy className="w-4 h-4" />
                    Скопировать
                  </span>
                )}
              </button>
            </div>
            <p className="text-text-primary italic leading-relaxed text-lg">
              "{generatedPrompt}"
            </p>
          </div>

          {/* Английский промпт */}
          <div className="bg-gradient-to-r from-accent-secondary/10 to-accent-primary/10 rounded-2xl p-6 border border-accent-secondary/30 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-text-primary flex items-center gap-2 text-lg">
                <span className="text-lg">🇺🇸</span>
                Промпт на английском языке
              </h4>
              <button 
                onClick={() => copyToClipboard(englishPrompt, 'english')}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  copied === 'english'
                    ? 'bg-accent-secondary/20 text-accent-secondary border border-accent-secondary/30' 
                    : 'bg-white/80 text-accent-secondary hover:bg-accent-secondary/5 border border-accent-secondary/20 hover:border-accent-secondary/40'
                }`}
              >
                {copied === 'english' ? (
                  <span className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Скопировано!
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Copy className="w-4 h-4" />
                    Скопировать
                  </span>
                )}
              </button>
            </div>
            <p className="text-text-primary italic leading-relaxed font-mono text-base">
              "{englishPrompt}"
            </p>
          </div>
        </div>
      )}

      {/* Примеры промптов */}
      <div>
        <h4 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-accent-primary" />
          Примеры готовых промптов
        </h4>
        <div className="grid md:grid-cols-3 gap-6">
          {promptExamples.map((example, idx) => (
            <div key={idx} className="bg-white/80 border border-accent-primary/20 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group backdrop-blur-sm hover:border-accent-primary/40">
              <div className="space-y-4">
                <div 
                  onClick={() => setGeneratedPrompt(example.rus)}
                  className="bg-accent-primary/5 p-4 rounded-xl border border-accent-primary/20 group-hover:border-accent-primary/30 transition-all"
                >
                  <span className="text-sm text-accent-primary font-medium flex items-center gap-2">
                    <span>🇷🇺</span> Русский:
                  </span>
                  <p className="text-sm text-text-secondary mt-2">"{example.rus}"</p>
                </div>
                <div 
                  onClick={() => setEnglishPrompt(example.eng)}
                  className="bg-accent-secondary/5 p-4 rounded-xl border border-accent-secondary/20 group-hover:border-accent-secondary/30 transition-all"
                >
                  <span className="text-sm text-accent-secondary font-medium flex items-center gap-2">
                    <span>🇺🇸</span> English:
                  </span>
                  <p className="text-sm text-text-secondary mt-2 font-mono">"{example.eng}"</p>
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