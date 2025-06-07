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
    "Магистр компьютерных наук, МГУ",
    "6+ лет в области машинного обучения",
    "Автор 50+ статей о нейросетях",
    "Сертифицированный эксперт Google AI"
  ],
  socialLinks: [
    { platform: "LinkedIn", url: "https://linkedin.com/in/dmitry-volkov", icon: <ExternalLink className="w-4 h-4" /> },
    { platform: "Twitter", url: "https://twitter.com/dmitry_ai", icon: <MessageSquare className="w-4 h-4" /> },
    { platform: "GitHub", url: "https://github.com/dmitry-volkov", icon: <User className="w-4 h-4" /> },
    { platform: "Telegram", url: "https://t.me/ai_expert_channel", icon: <MessageSquare className="w-4 h-4" /> }
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
    <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50/80 to-purple-50/80 relative overflow-hidden">
      {/* Декоративные элементы фона */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-xl"></div>
        <div className="absolute top-32 right-16 w-32 h-32 bg-gradient-to-br from-purple-200/15 to-blue-200/15 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-br from-blue-200/10 to-purple-200/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-gradient-to-br from-purple-200/20 to-blue-200/20 rounded-full blur-xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Карточка автора */}
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-blue-200/30 overflow-hidden mb-12 relative">
          
          <div className="px-8 py-8">
            <div className="flex flex-col lg:flex-row lg:items-start gap-6">
              {/* Аватар автора */}
              <div className="relative group">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-600 via-purple-600 to-blue-600 p-1.5 shadow-2xl group-hover:shadow-blue-600/30 transition-all duration-300">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center relative overflow-hidden">
                    <User className="w-12 h-12 text-gray-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-600/5 to-transparent"></div>
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                {/* Пульсирующий эффект */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Информация об авторе */}
              <div className="flex-1">
                <div className="mb-4">
                  <h3 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                    {authorData.name}
                    <CheckCircle className="w-6 h-6 text-blue-600 ml-2" />
                  </h3>
                  <p className="text-xl text-blue-600 font-semibold mb-4">{authorData.title}</p>
                  <p className="text-gray-600 leading-relaxed max-w-3xl text-lg">{authorData.bio}</p>
                </div>

                {/* Статистика автора */}
                <div className="flex flex-wrap gap-6 mb-6">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-gray-600">
                      <span className="font-semibold text-gray-900">{authorData.stats.experience}</span> опыта
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-gray-600">
                      <span className="font-semibold text-gray-900">{authorData.stats.articles}</span> статей
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-gray-600">
                      <span className="font-semibold text-gray-900">{authorData.stats.followers.toLocaleString()}</span> подписчиков
                    </span>
                  </div>
                </div>

                {/* Дата последнего обновления */}
                <div className="mb-6">
                  <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-lg border border-blue-200">
                    <Calendar className="w-4 h-4 text-purple-600" />
                    <span className="text-sm text-gray-600">
                      <span className="font-semibold text-gray-900">Последнее обновление:</span> {new Date().toLocaleDateString('ru-RU', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                </div>

                {/* Квалификация */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Award className="w-4 h-4 text-purple-600" />
                    Квалификация и достижения:
                  </h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {authorData.credentials.map((credential, idx) => (
                      <div key={idx} className="flex items-start text-sm text-gray-600 bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-lg border border-blue-200">
                        <CheckCircle className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{credential}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Секция комментариев */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-accent-primary/20 overflow-hidden">
          <div className="bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 px-8 py-6 border-b border-accent-primary/20">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-text-primary flex items-center">
                <MessageSquare className="w-6 h-6 mr-2 text-accent-primary" />
                Комментарии ({comments.length})
              </h3>
              
              {/* Сортировка */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-text-secondary">Сортировка:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'recent' | 'popular')}
                  className="text-sm border border-accent-primary/30 rounded-lg px-3 py-1 focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary bg-white"
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
              <h4 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-accent-secondary" />
                Поделитесь своим мнением
              </h4>
              <div className="space-y-4">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Напишите ваш комментарий... Поделитесь опытом использования нейросетей или задайте вопрос!"
                  className="w-full h-24 px-4 py-3 border border-accent-primary/30 rounded-xl focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary resize-none bg-white"
                />
                <div className="flex items-center justify-between">
                  <p className="text-xs text-text-secondary">
                    Комментарии модерируются. Будьте вежливы и конструктивны.
                  </p>
                  <button
                    onClick={handleSubmitComment}
                    disabled={!newComment.trim()}
                    className="bg-gradient-to-r from-accent-primary to-accent-secondary text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium transform hover:scale-105"
                  >
                    Опубликовать
                  </button>
                </div>
              </div>
            </div>

            {/* Список комментариев */}
            <div className="space-y-6">
              {sortedComments.map((comment) => (
                <div key={comment.id} className="border-b border-accent-primary/20 pb-6 last:border-b-0">
                  {/* Основной комментарий */}
                  <div className="flex space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-white font-semibold text-sm">
                        {comment.author.name[0]}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h5 className="font-semibold text-text-primary flex items-center">
                          {comment.author.name}
                          {comment.author.isVerified && (
                            <CheckCircle className="w-4 h-4 text-accent-primary ml-1" />
                          )}
                        </h5>
                        {comment.author.expertise && (
                          <span className="bg-accent-primary/10 text-accent-secondary px-2 py-1 rounded-full text-xs font-medium">
                            {comment.author.expertise}
                          </span>
                        )}
                        <span className="text-sm text-text-secondary">{comment.timestamp}</span>
                      </div>
                      
                      <p className="text-text-secondary leading-relaxed mb-3">{comment.content}</p>
                      
                      {/* Действия с комментарием */}
                      <div className="flex items-center space-x-4 text-sm">
                        <button
                          onClick={() => handleLike(comment.id)}
                          className={`flex items-center space-x-1 hover:text-accent-primary transition-colors ${
                            comment.isLiked ? 'text-accent-primary' : 'text-text-secondary'
                          }`}
                        >
                          <ThumbsUp className={`w-4 h-4 ${comment.isLiked ? 'fill-current' : ''}`} />
                          <span>{comment.likes}</span>
                        </button>
                        
                        <button
                          onClick={() => setActiveReply(activeReply === comment.id ? null : comment.id)}
                          className="text-text-secondary hover:text-accent-primary transition-colors"
                        >
                          Ответить
                        </button>
                        
                        <button className="text-text-secondary hover:text-accent-primary transition-colors">
                          <Share2 className="w-4 h-4" />
                        </button>
                        
                        <button className="text-text-secondary hover:text-accent-primary transition-colors">
                          <Flag className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Форма ответа */}
                      {activeReply === comment.id && (
                        <div className="mt-4 p-4 bg-accent-primary/10 rounded-lg">
                          <textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Напишите ответ..."
                            className="w-full h-20 px-3 py-2 border border-accent-primary/30 rounded-lg focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary resize-none text-sm"
                          />
                          <div className="flex justify-end space-x-2 mt-2">
                            <button
                              onClick={() => setActiveReply(null)}
                              className="px-4 py-1 text-sm text-text-secondary hover:text-text-primary transition-colors"
                            >
                              Отмена
                            </button>
                            <button
                              onClick={() => handleSubmitReply(comment.id)}
                              disabled={!replyText.trim()}
                              className="bg-gradient-to-r from-accent-primary to-accent-secondary text-white px-4 py-1 rounded text-sm hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
                            <div key={reply.id} className="flex space-x-3 ml-4 pl-4 border-l-2 border-accent-primary/20">
                              <div className="flex-shrink-0">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-primary/5 to-accent-secondary/5 flex items-center justify-center text-white font-semibold text-xs">
                                  {reply.author.name[0]}
                                </div>
                              </div>
                              
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                  <h6 className="font-semibold text-sm text-text-primary flex items-center">
                                    {reply.author.name}
                                    {reply.author.isVerified && (
                                      <CheckCircle className="w-3 h-3 text-accent-primary ml-1" />
                                    )}
                                  </h6>
                                  <span className="text-xs text-text-secondary">{reply.timestamp}</span>
                                </div>
                                
                                <p className="text-sm text-text-secondary leading-relaxed mb-2">{reply.content}</p>
                                
                                <div className="flex items-center space-x-3 text-xs">
                                  <button
                                    onClick={() => handleLike(comment.id, reply.id)}
                                    className={`flex items-center space-x-1 hover:text-accent-primary transition-colors ${
                                      reply.isLiked ? 'text-accent-primary' : 'text-text-secondary'
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
            <div className="mt-8 pt-6 border-t border-accent-primary/20">
              <div className="bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 rounded-xl p-6 text-center border border-accent-primary/20">
                <h4 className="text-lg font-semibold text-text-primary mb-2 flex items-center justify-center gap-2">
                  <MessageSquare className="w-5 h-5 text-accent-primary" />
                  Присоединяйтесь к обсуждению!
                </h4>
                <p className="text-text-secondary mb-4">
                  Ваш опыт и вопросы помогают сообществу. Поделитесь своими находками в мире AI!
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="bg-white/80 px-3 py-1 rounded-full text-sm text-text-secondary border border-accent-primary/20 shadow-sm">
                    #НейросетиДляНовичков
                  </span>
                  <span className="bg-white/80 px-3 py-1 rounded-full text-sm text-text-secondary border border-accent-primary/20 shadow-sm">
                    #AIArt
                  </span>
                  <span className="bg-white/80 px-3 py-1 rounded-full text-sm text-text-secondary border border-accent-primary/20 shadow-sm">
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

{/* Дополнительные CSS стили */}
<style jsx global>{`
  @keyframes gradient-x {
    0%, 100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }
  
  .animate-gradient-x {
    background-size: 200% 200%;
    animation: gradient-x 6s ease infinite;
  }
  
  .bg-size-200 {
    background-size: 200% 200%;
  }
`}</style> 