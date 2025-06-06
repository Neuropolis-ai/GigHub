import Link from 'next/link'

export default function AIToolsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            ИИ-инструменты и нейросети
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Каталог лучших искусственных интеллектов для различных задач
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Нейросети для изображений */}
          <Link 
            href="/ai-tools/image-generation" 
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 group"
          >
            <div className="text-4xl mb-4">🎨</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
              Нейросети для изображений
            </h2>
            <p className="text-gray-600 mb-4">
              Создавайте уникальные изображения с помощью ИИ: Midjourney, DALL-E 3, Stable Diffusion и другие
            </p>
            <div className="inline-flex items-center text-purple-600 font-medium">
              Смотреть ТОП-15 →
            </div>
          </Link>

          {/* Заглушки для других категорий */}
          <div className="bg-white rounded-xl shadow-lg p-8 opacity-50">
            <div className="text-4xl mb-4">📝</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Нейросети для текста
            </h2>
            <p className="text-gray-600 mb-4">
              ИИ для создания и обработки текста
            </p>
            <div className="text-gray-400">Скоро...</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 opacity-50">
            <div className="text-4xl mb-4">🎵</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Нейросети для музыки
            </h2>
            <p className="text-gray-600 mb-4">
              ИИ для создания музыки и аудио
            </p>
            <div className="text-gray-400">Скоро...</div>
          </div>
        </div>
      </div>
    </div>
  )
} 