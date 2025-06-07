'use client';

import React, { useState } from 'react';
import { User, ExternalLink, MessageSquare, Heart, Share2, Flag, ThumbsUp, MoreHorizontal, Calendar, Award, Users, CheckCircle } from 'lucide-react';
import Image from 'next/image';

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
    isVerified?: boolean;
    expertise?: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  replies: Reply[];
  isLiked?: boolean;
}

interface Reply {
  id: string;
  author: {
    name: string;
    avatar: string;
    isVerified?: boolean;
  };
  content: string;
  timestamp: string;
  likes: number;
  isLiked?: boolean;
}

// Данные автора
const authorData = {
  name: "Дмитрий Волков",
  title: "Эксперт по ИИ и нейросетям",
  avatar: "/images/author-avatar.jpg", // Будет заглушка
  bio: "Более 5 лет изучаю и тестирую нейросети для генерации изображений. Помог тысячам пользователей выбрать подходящий AI-инструмент. Регулярно публикую обзоры новых сервисов и делюсь лучшими практиками.",
  credentials: [
    "🎓 Магистр компьютерных наук, МГУ",
    "💼 6+ лет в области машинного обучения",
    "📚 Автор 50+ статей о нейросетях",
    "🏆 Сертифицированный эксперт Google AI"
  ],
  socialLinks: [
    { platform: "LinkedIn", url: "https://linkedin.com/in/dmitry-volkov", icon: "💼" },
    { platform: "Twitter", url: "https://twitter.com/dmitry_ai", icon: "🐦" },
    { platform: "GitHub", url: "https://github.com/dmitry-volkov", icon: "💻" },
    { platform: "Telegram", url: "https://t.me/ai_expert_channel", icon: "✈️" }
  ],
  stats: {
    articles: 127,
    followers: 15300,
    experience: "6 лет"
  }
};

// Пример комментариев
const initialComments: Comment[] = [
  {
    id: 'comment-1',
    author: {
      name: 'Анна Петрова',
      avatar: '/images/user1.jpg',
      isVerified: true,
      expertise: 'Digital Artist'
    },
    content: 'Отличный обзор! Пользуюсь Midjourney уже год, и действительно качество потрясающее. Особенно понравились советы по промптам в статье.',
    timestamp: '2 часа назад',
    likes: 24,
    replies: [
      {
        id: 'reply-1',
        author: {
          name: 'Дмитрий Волков',
          avatar: '/images/author-avatar.jpg',
          isVerified: true
        },
        content: 'Спасибо, Анна! Midjourney действительно лидер по качеству. Планирую в следующей статье разобрать более продвинутые техники работы с промптами.',
        timestamp: '1 час назад',
        likes: 8
      }
    ]
  },
  {
    id: 'comment-2',
    author: {
      name: 'Максим Иванов',
      avatar: '/images/user2.jpg',
      expertise: 'Веб-дизайнер'
    },
    content: 'А есть ли нейросети, которые хорошо генерируют UI элементы и иконки? Для работы над интерфейсами это было бы очень полезно.',
    timestamp: '4 часа назад',
    likes: 12,
    replies: []
  },
  {
    id: 'comment-3',
    author: {
      name: 'Елена Сорокина',
      avatar: '/images/user3.jpg',
      isVerified: true,
      expertise: 'AI Researcher'
    },
    content: 'Хорошо структурированная статья. Добавлю в закладки для коллег. Особенно ценны практические советы и примеры промптов.',
    timestamp: '6 часов назад',
    likes: 18,
    replies: []
  }
];

const AuthorAndCommentsSection: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [activeReply, setActiveReply] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'popular'>('recent');

  const handleLike = (commentId: string, replyId?: string) => {
    setComments(prevComments =>
      prevComments.map(comment => {
        if (comment.id === commentId) {
          if (!replyId) {
            return {
              ...comment,
              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
              isLiked: !comment.isLiked
            };
          } else {
            return {
              ...comment,
              replies: comment.replies.map(reply =>
                reply.id === replyId
                  ? {
                      ...reply,
                      likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
                      isLiked: !reply.isLiked
                    }
                  : reply
              )
            };
          }
        }
        return comment;
      })
    );
  };

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: `comment-${Date.now()}`,
      author: {
        name: 'Аноним',
        avatar: '/images/default-avatar.jpg'
      },
      content: newComment,
      timestamp: 'только что',
      likes: 0,
      replies: []
    };

    setComments(prev => [comment, ...prev]);
    setNewComment('');
  };

  const handleSubmitReply = (commentId: string) => {
    if (!replyText.trim()) return;

    const reply: Reply = {
      id: `reply-${Date.now()}`,
      author: {
        name: 'Аноним',
        avatar: '/images/default-avatar.jpg'
      },
      content: replyText,
      timestamp: 'только что',
      likes: 0
    };

    setComments(prev =>
      prev.map(comment =>
        comment.id === commentId
          ? { ...comment, replies: [...comment.replies, reply] }
          : comment
      )
    );

    setReplyText('');
    setActiveReply(null);
  };

  const sortedComments = [...comments].sort((a, b) => {
    if (sortBy === 'popular') {
      return b.likes - a.likes;
    }
    return 0; // для 'recent' порядок уже правильный
  });

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-6">
        
        {/* Карточка автора */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden mb-12">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-24"></div>
          
          <div className="px-8 pb-8">
            <div className="flex flex-col lg:flex-row lg:items-start gap-6 -mt-12">
              {/* Аватар автора */}
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1 shadow-lg">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                    <User className="w-10 h-10 text-gray-600" />
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Информация об авторе */}
              <div className="flex-1">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1 flex items-center">
                    {authorData.name}
                    <CheckCircle className="w-5 h-5 text-blue-500 ml-2" />
                  </h3>
                  <p className="text-lg text-blue-600 font-semibold mb-2">{authorData.title}</p>
                  <p className="text-gray-700 leading-relaxed max-w-3xl">{authorData.bio}</p>
                </div>

                {/* Статистика автора */}
                <div className="flex flex-wrap gap-6 mb-6">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      <span className="font-semibold text-gray-900">{authorData.stats.experience}</span> опыта
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      <span className="font-semibold text-gray-900">{authorData.stats.articles}</span> статей
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      <span className="font-semibold text-gray-900">{authorData.stats.followers.toLocaleString()}</span> подписчиков
                    </span>
                  </div>
                </div>

                {/* Квалификация */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Квалификация и достижения:</h4>
                  <div className="grid md:grid-cols-2 gap-2">
                    {authorData.credentials.map((credential, idx) => (
                      <div key={idx} className="flex items-start text-sm text-gray-700">
                        <span className="mr-2">{credential.split(' ')[0]}</span>
                        <span>{credential.substring(credential.indexOf(' ') + 1)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Социальные сети */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Найти автора:</h4>
                  <div className="flex flex-wrap gap-3">
                    {authorData.socialLinks.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors group"
                      >
                        <span className="text-lg">{link.icon}</span>
                        <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                          {link.platform}
                        </span>
                        <ExternalLink className="w-3 h-3 text-gray-400" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Секция комментариев */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-8 py-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                <MessageSquare className="w-6 h-6 mr-2 text-blue-600" />
                Комментарии ({comments.length})
              </h3>
              
              {/* Сортировка */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Сортировка:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'recent' | 'popular')}
                  className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="recent">Новые</option>
                  <option value="popular">Популярные</option>
                </select>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Форма добавления комментария */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Поделитесь своим мнением</h4>
              <div className="space-y-4">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Напишите ваш комментарий... Поделитесь опытом использования нейросетей или задайте вопрос!"
                  className="w-full h-24 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">
                    Комментарии модерируются. Будьте вежливы и конструктивны.
                  </p>
                  <button
                    onClick={handleSubmitComment}
                    disabled={!newComment.trim()}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                  >
                    Опубликовать
                  </button>
                </div>
              </div>
            </div>

            {/* Список комментариев */}
            <div className="space-y-6">
              {sortedComments.map((comment) => (
                <div key={comment.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                  {/* Основной комментарий */}
                  <div className="flex space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                        {comment.author.name[0]}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h5 className="font-semibold text-gray-900 flex items-center">
                          {comment.author.name}
                          {comment.author.isVerified && (
                            <CheckCircle className="w-4 h-4 text-blue-500 ml-1" />
                          )}
                        </h5>
                        {comment.author.expertise && (
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                            {comment.author.expertise}
                          </span>
                        )}
                        <span className="text-sm text-gray-500">{comment.timestamp}</span>
                      </div>
                      
                      <p className="text-gray-700 leading-relaxed mb-3">{comment.content}</p>
                      
                      {/* Действия с комментарием */}
                      <div className="flex items-center space-x-4 text-sm">
                        <button
                          onClick={() => handleLike(comment.id)}
                          className={`flex items-center space-x-1 hover:text-blue-600 transition-colors ${
                            comment.isLiked ? 'text-blue-600' : 'text-gray-500'
                          }`}
                        >
                          <ThumbsUp className={`w-4 h-4 ${comment.isLiked ? 'fill-current' : ''}`} />
                          <span>{comment.likes}</span>
                        </button>
                        
                        <button
                          onClick={() => setActiveReply(activeReply === comment.id ? null : comment.id)}
                          className="text-gray-500 hover:text-blue-600 transition-colors"
                        >
                          Ответить
                        </button>
                        
                        <button className="text-gray-500 hover:text-blue-600 transition-colors">
                          <Share2 className="w-4 h-4" />
                        </button>
                        
                        <button className="text-gray-500 hover:text-red-600 transition-colors">
                          <Flag className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Форма ответа */}
                      {activeReply === comment.id && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                          <textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Напишите ответ..."
                            className="w-full h-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                          />
                          <div className="flex justify-end space-x-2 mt-2">
                            <button
                              onClick={() => setActiveReply(null)}
                              className="px-4 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                            >
                              Отмена
                            </button>
                            <button
                              onClick={() => handleSubmitReply(comment.id)}
                              disabled={!replyText.trim()}
                              className="bg-blue-600 text-white px-4 py-1 rounded text-sm hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Ответить
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Ответы */}
                      {comment.replies.length > 0 && (
                        <div className="mt-4 space-y-4">
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="flex space-x-3 ml-4 pl-4 border-l-2 border-gray-200">
                              <div className="flex-shrink-0">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white font-semibold text-xs">
                                  {reply.author.name[0]}
                                </div>
                              </div>
                              
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                  <h6 className="font-semibold text-sm text-gray-900 flex items-center">
                                    {reply.author.name}
                                    {reply.author.isVerified && (
                                      <CheckCircle className="w-3 h-3 text-blue-500 ml-1" />
                                    )}
                                  </h6>
                                  <span className="text-xs text-gray-500">{reply.timestamp}</span>
                                </div>
                                
                                <p className="text-sm text-gray-700 leading-relaxed mb-2">{reply.content}</p>
                                
                                <div className="flex items-center space-x-3 text-xs">
                                  <button
                                    onClick={() => handleLike(comment.id, reply.id)}
                                    className={`flex items-center space-x-1 hover:text-blue-600 transition-colors ${
                                      reply.isLiked ? 'text-blue-600' : 'text-gray-500'
                                    }`}
                                  >
                                    <ThumbsUp className={`w-3 h-3 ${reply.isLiked ? 'fill-current' : ''}`} />
                                    <span>{reply.likes}</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Призыв к участию */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 text-center">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  💬 Присоединяйтесь к обсуждению!
                </h4>
                <p className="text-gray-600 mb-4">
                  Ваш опыт и вопросы помогают сообществу. Поделитесь своими находками в мире AI!
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="bg-white px-3 py-1 rounded-full text-sm text-gray-700 border border-gray-200">
                    #НейросетиДляНовичков
                  </span>
                  <span className="bg-white px-3 py-1 rounded-full text-sm text-gray-700 border border-gray-200">
                    #AIArt
                  </span>
                  <span className="bg-white px-3 py-1 rounded-full text-sm text-gray-700 border border-gray-200">
                    #МашинноеОбучение
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Микроразметка для автора */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": authorData.name,
            "jobTitle": authorData.title,
            "description": authorData.bio,
            "url": "https://gighub.ru",
            "sameAs": authorData.socialLinks.map(link => link.url)
          })
        }}
      />
    </section>
  );
};

export default AuthorAndCommentsSection; 