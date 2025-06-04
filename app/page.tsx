import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold text-center">
          GigHub — Платформа лучших ИИ-инструментов
        </h1>
      </div>

      <div className="relative flex place-items-center">
        <div className="text-center">
          <h2 className="mb-3 text-2xl font-semibold">
            Добро пожаловать в мир ИИ-сервисов
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Откройте для себя лучшие нейросети и ИИ-сервисы мира в одном месте
          </p>
        </div>
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <Link 
          href="/categories"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100"
        >
          <h3 className="mb-3 text-2xl font-semibold">
            Категории{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              →
            </span>
          </h3>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Просмотрите все доступные категории ИИ-сервисов
          </p>
        </Link>

        <Link
          href="/ai-services"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100"
        >
          <h3 className="mb-3 text-2xl font-semibold">
            Сервисы{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              →
            </span>
          </h3>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Изучите тысячи ИИ-инструментов для любых задач
          </p>
        </Link>

        <Link
          href="/ai-services"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100"
        >
          <h3 className="mb-3 text-2xl font-semibold">
            Поиск{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              →
            </span>
          </h3>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Найдите идеальный ИИ-инструмент для ваших нужд
          </p>
        </Link>

        <Link
          href="/ai-services"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100"
        >
          <h3 className="mb-3 text-2xl font-semibold">
            Новинки{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              →
            </span>
          </h3>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Откройте для себя последние ИИ-инновации
          </p>
        </Link>
      </div>
    </main>
  )
} 