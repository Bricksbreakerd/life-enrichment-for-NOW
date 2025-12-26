import React, { useState, useEffect } from 'react';
import { Sparkles, RefreshCw, Grid, Heart, Coffee, BookOpen, Music, MapPin, Feather, Brain, Users, Utensils, Smile, Sun, Wind, Move, Eye, Edit3, Smartphone } from 'lucide-react';

// 莫兰迪色系配置 - 优化版
const morandiColors = {
  defaultBg: '#F2F0EB', // 默认暖白
  
  // 页面背景色（更浅、更柔和的版本，用于全屏背景）
  pageBackgrounds: {
    '环境丰容': '#E3E8E5', // 浅豆绿背景 - 放松
    '感官丰容': '#EAE8ED', // 浅熏衣草紫 - 🆕 更有神秘感和区分度
    '认知丰容': '#E1E9ED', // 浅雾蓝背景 - 清晰
    '社交丰容': '#F0E4E4', // 浅柔粉背景 - 温暖
    '食物丰容': '#F2EBE5', // 浅燕麦色 - 🆕 更暖一点，像面包的颜色
  },

  // 强调色（用于按钮、标签、图标背景）
  categories: {
    '环境丰容': { bg: 'bg-[#8DA399]', text: 'text-[#8DA399]', hex: '#8DA399' }, // 灰绿
    '感官丰容': { bg: 'bg-[#9D96A8]', text: 'text-[#9D96A8]', hex: '#9D96A8' }, // 🆕 灰紫 (Muted Lavender)
    '认知丰容': { bg: 'bg-[#7A9CA9]', text: 'text-[#7A9CA9]', hex: '#7A9CA9' }, // 雾霾蓝
    '社交丰容': { bg: 'bg-[#D4A5A5]', text: 'text-[#D4A5A5]', hex: '#D4A5A5' }, // 枯粉
    '食物丰容': { bg: 'bg-[#C8B095]', text: 'text-[#C8B095]', hex: '#C8B095' }, // 🆕 暖姜黄/焦糖奶咖
  }
};

// 丰容数据库 (保持不变)
const enrichmentData = {
  '环境丰容': [
    { icon: <MapPin />, text: '改变家具布局，哪怕只是把桌子转个方向' },
    { icon: <Feather />, text: '整理一个角落，只放你最喜欢的几样东西' },
    { icon: <Sparkles />, text: '给房间换个光源，或者点一支没用过的香薰' },
    { icon: <MapPin />, text: '去一个从未去过的公园或街道散步' },
    { icon: <Feather />, text: '更换床单或窗帘的颜色，改变视觉刺激' },
    { icon: <MapPin />, text: '断舍离：扔掉或捐赠3件不再使用的物品' },
    { icon: <Sparkles />, text: '买一束没买过的花，放在显眼的位置' },
    { icon: <Smartphone />, text: '重新排列手机主屏幕的图标位置' },
    { icon: <Wind />, text: '把窗户完全打开通风10分钟，感受空气流动' },
    { icon: <MapPin />, text: '换一条路回家，观察沿途的一棵树' },
    { icon: <Feather />, text: '整理你的书桌，把常用的东西放在左边（或反过来）' },
    { icon: <Sparkles />, text: '给家里的植物擦擦叶子' },
    { icon: <MapPin />, text: '坐在房间里平时不会坐的地板上，换个视角看房间' },
    { icon: <Smartphone />, text: '更换手机或电脑的壁纸，换成一张风景照' },
  ],
  '感官丰容': [
    { icon: <Music />, text: '闭上眼睛，只用触觉感受一件物品的纹理（如毛毯、树叶）' },
    { icon: <Music />, text: '听一首完全陌生语言的歌曲' },
    { icon: <Feather />, text: '赤脚在草地、沙滩或地毯上行走5分钟' },
    { icon: <Wind />, text: '打开窗户，专注聆听窗外的三种声音' },
    { icon: <Feather />, text: '洗一个热水澡，配合一种新的沐浴露味道' },
    { icon: <Music />, text: '尝试白噪音（雨声、篝火声）进行冥想' },
    { icon: <Feather />, text: '用冷水洗脸，感受温度的瞬间变化' },
    { icon: <Eye />, text: '远眺窗外最远的一栋建筑，保持注视1分钟' },
    { icon: <Move />, text: '站起来伸个大大的懒腰，感受肌肉的拉伸' },
    { icon: <Feather />, text: '找一块冰块，握在手心里直到融化' },
    { icon: <Eye />, text: '在房间里寻找5种蓝色的东西' },
    { icon: <Music />, text: '戴上耳机，把音量调小，只听乐器伴奏的声音' },
    { icon: <Feather />, text: '用指尖轻轻敲击桌面，感受震动' },
    { icon: <Move />, text: '做十次深呼吸，感受胸腔的起伏' },
  ],
  '认知丰容': [
    { icon: <Brain />, text: '换一只手刷牙或拿筷子' },
    { icon: <BookOpen />, text: '阅读一篇维基百科的随机词条' },
    { icon: <Brain />, text: '不使用导航，凭记忆或路牌去一个目的地' },
    { icon: <BookOpen />, text: '学习一个生僻字或一句外语问候' },
    { icon: <Brain />, text: '玩拼图或数独，专注15分钟' },
    { icon: <BookOpen />, text: '观察路人，在心里编一个关于ta的小故事' },
    { icon: <Brain />, text: '尝试倒着念一段熟悉的文字' },
    { icon: <Edit3 />, text: '用纸笔列出3件今天让你开心的小事' },
    { icon: <Brain />, text: '从100开始倒数，每次减去7（100, 93, 86...）' },
    { icon: <BookOpen />, text: '找一本很久没看的书，随便翻开一页阅读' },
    { icon: <Edit3 />, text: '尝试画出你左手的轮廓' },
    { icon: <Brain />, text: '回忆并复述昨天晚餐吃了什么，包含细节' },
    { icon: <BookOpen />, text: '了解一个你完全陌生的领域的冷知识（比如：云的分类）' },
    { icon: <Brain />, text: '不看手机，在脑海里规划明天的穿搭' },
  ],
  '社交丰容': [
    { icon: <Users />, text: '给许久未见的朋友打一个语音电话' },
    { icon: <Heart />, text: '对便利店店员或快递员真诚地说声谢谢' },
    { icon: <Users />, text: '去人多的地方（如咖啡馆）观察人类，但不交流' },
    { icon: <Heart />, text: '给家人发一张此时此刻的照片' },
    { icon: <Users />, text: '在社交媒体上搜索一个冷门话题并浏览' },
    { icon: <Heart />, text: '写一张便签条，贴在冰箱或镜子上给自己看' },
    { icon: <Smile />, text: '对着镜子里的自己微笑10秒钟' },
    { icon: <Users />, text: '给朋友圈里的一条动态认真写一条评论' },
    { icon: <Heart />, text: '找出手机里的一张旧合影，发给照片里的人' },
    { icon: <Users />, text: '听一期谈话类播客，假装自己是参与者' },
    { icon: <Smile />, text: '心里默默祝福刚刚擦肩而过的一位陌生人' },
    { icon: <Heart />, text: '给未来的自己写一段简短的话' },
    { icon: <Users />, text: '去公园看看老人下棋或孩子玩耍' },
  ],
  '食物丰容': [
    { icon: <Utensils />, text: '尝试一种从未吃过的水果或零食' },
    { icon: <Coffee />, text: '专注地喝一杯水，感受水流过喉咙的感觉' },
    { icon: <Utensils />, text: '用不同的餐具吃饭（比如用盘子吃面）' },
    { icon: <Coffee />, text: '根据食谱做一道从未做过的菜' },
    { icon: <Utensils />, text: '吃饭时不看手机，每口咀嚼20次' },
    { icon: <Coffee />, text: '自制一杯特调饮料（咖啡、茶或果汁）' },
    { icon: <Utensils />, text: '去超市买一种没见过的蔬菜' },
    { icon: <Utensils />, text: '吃一颗葡萄干，花5分钟时间慢慢吃完' },
    { icon: <Coffee />, text: '闻一闻咖啡豆、茶叶或香料的味道' },
    { icon: <Utensils />, text: '用非惯用手吃零食' },
    { icon: <Utensils />, text: '把今天的早餐摆盘得像餐厅一样漂亮' },
    { icon: <Coffee />, text: '尝试不同温度的水（温水、冰水）带来的口感差异' },
  ]
};

const categoryIcons = {
  '环境丰容': <MapPin size={18} />,
  '感官丰容': <Music size={18} />,
  '认知丰容': <Brain size={18} />,
  '社交丰容': <Users size={18} />,
  '食物丰容': <Utensils size={18} />,
};

const App = () => {
  const [currentActivity, setCurrentActivity] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentBg, setCurrentBg] = useState(morandiColors.defaultBg);

  // 初始化
  useEffect(() => {
    handleRandomize();
  }, []);

  // 当当前活动改变时，平滑切换背景色
  useEffect(() => {
    if (currentActivity) {
      const newBg = morandiColors.pageBackgrounds[currentActivity.category] || morandiColors.defaultBg;
      setCurrentBg(newBg);
    }
  }, [currentActivity]);

  const getRandomActivity = (category = null) => {
    let pool = [];
    let cat = category;
    
    if (category) {
      pool = enrichmentData[category];
    } else {
      const categories = Object.keys(enrichmentData);
      cat = categories[Math.floor(Math.random() * categories.length)];
      pool = enrichmentData[cat];
    }

    const item = pool[Math.floor(Math.random() * pool.length)];
    return { ...item, category: cat };
  };

  const handleRandomize = () => {
    setIsAnimating(true);
    setTimeout(() => {
      const newItem = getRandomActivity(selectedCategory);
      setCurrentActivity(newItem);
      setIsAnimating(false);
    }, 400);
  };

  const handleCategorySelect = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  // 监听类别变化，自动刷新
  useEffect(() => {
    handleRandomize();
  }, [selectedCategory]);

  return (
    <div 
      className="min-h-screen font-sans text-slate-600 flex flex-col items-center justify-center p-6 transition-colors duration-1000 ease-in-out"
      style={{ backgroundColor: currentBg }}
    >
      
      {/* 标题区 */}
      <div className="text-center mb-8 animate-fade-in-down select-none">
        <h1 className="text-3xl font-bold tracking-widest text-slate-700 mb-2 drop-shadow-sm">生活丰容</h1>
        <p className="text-sm text-slate-500 tracking-wide opacity-80">打破刻板 · 唤醒感知 · 重建联结</p>
      </div>

      {/* 主卡片区 */}
      <div className="w-full max-w-md perspective-1000 mb-10">
        <div 
          onClick={handleRandomize}
          className={`
            relative w-full aspect-[4/3] bg-white rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] 
            flex flex-col items-center justify-center p-8 text-center border border-white/60 cursor-pointer
            transition-all duration-500 transform hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)]
            ${isAnimating ? 'opacity-50 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'}
          `}
        >
          {currentActivity && (
            <>
              {/* 卡片右上角标签 - 使用动态颜色 */}
              <div className={`absolute top-6 right-6 text-xs font-medium px-3 py-1 rounded-full text-white ${morandiColors.categories[currentActivity.category].bg}`}>
                {currentActivity.category}
              </div>
              
              {/* 图标背景 - 使用动态颜色的透明版 */}
              <div 
                className="mb-6 p-4 rounded-full bg-opacity-20"
                style={{ backgroundColor: `${morandiColors.categories[currentActivity.category].hex}33` }} 
              >
                <div className={morandiColors.categories[currentActivity.category].text}>
                  {React.cloneElement(currentActivity.icon, { size: 48, strokeWidth: 1.5 })}
                </div>
              </div>
              
              <h2 className="text-xl md:text-2xl font-medium leading-relaxed text-slate-700 select-none">
                {currentActivity.text}
              </h2>

              <div className="mt-8 text-xs text-slate-400 select-none">
                {selectedCategory ? '再次点击卡片或按钮刷新' : '点击卡片随机获取灵感'}
              </div>
            </>
          )}
        </div>
      </div>

      {/* 控制区 */}
      <div className="w-full max-w-md space-y-6">
        
        {/* 刷新按钮 - 颜色随类别变化 */}
        <button 
          onClick={handleRandomize}
          className={`
            w-full py-4 rounded-xl text-white shadow-lg active:scale-95 transition-all duration-500 flex items-center justify-center gap-2
            hover:shadow-xl hover:brightness-105
          `}
          style={{ 
            backgroundColor: currentActivity ? morandiColors.categories[currentActivity.category].hex : '#475569',
            boxShadow: `0 10px 15px -3px ${currentActivity ? morandiColors.categories[currentActivity.category].hex : '#94a3b8'}66` // Colored shadow
          }}
        >
          <RefreshCw className={`${isAnimating ? 'animate-spin' : ''}`} size={20} />
          <span>{selectedCategory ? `刷新${selectedCategory}任务` : '随机给我一个灵感'}</span>
        </button>

        {/* 类别筛选器 */}
        <div className="grid grid-cols-3 gap-3">
           <button
            onClick={() => handleCategorySelect(null)}
            className={`
              p-3 rounded-xl text-xs font-medium transition-all duration-300 border
              flex flex-col items-center gap-2
              ${selectedCategory === null 
                ? 'bg-white border-slate-300 shadow-md text-slate-800 scale-105 ring-2 ring-slate-100' 
                : 'bg-white/40 border-transparent hover:bg-white/80 text-slate-500'}
            `}
          >
            <Grid size={20} />
            全部随机
          </button>
          
          {Object.keys(enrichmentData).map((cat) => {
            const isActive = selectedCategory === cat;
            const colors = morandiColors.categories[cat];
            return (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className={`
                  p-3 rounded-xl text-xs font-medium transition-all duration-300 border
                  flex flex-col items-center gap-2 text-center
                  ${isActive 
                    ? 'border-transparent shadow-md scale-105 ring-2 ring-white/50 text-white' 
                    : 'bg-white/40 border-transparent hover:bg-white/80 text-slate-500'}
                `}
                style={isActive ? { backgroundColor: colors.hex } : {}}
              >
                {categoryIcons[cat]}
                {cat.replace('丰容', '')}
              </button>
            );
          })}
        </div>
      </div>

      {/* 底部提示 */}
      <div className="mt-12 text-center select-none">
         <p className="text-[10px] text-slate-400 max-w-xs mx-auto leading-relaxed opacity-70">
          * 刻板行为往往源于焦虑或感官匮乏。通过主动引入微小的变化（丰容），我们可以重新激活大脑的感知力。
         </p>
      </div>

      <style>{`
        @keyframes fade-in-down {
          0% { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default App;