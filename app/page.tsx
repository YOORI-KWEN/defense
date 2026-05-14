'use client';

import React, { useState, useEffect } from 'react';

const PROBLEMS = [
  {
    level: 1,
    title: "Level 1: 카멜 케이스(Camel Case) 함정",
    correct: "const [count, setCount] = useState(0);",
    wrong: "const [count, setcount] = useState(0);",
    answer: "setcount",
    hint: "리액트의 상태 변경 함수는 대문자를 사용합니다."
  },
  {
    level: 2,
    title: "Level 2: 마침표 vs 쉼표",
    correct: "console.log('Error found!');",
    wrong: "console,log('Error found!');",
    answer: "console,log",
    hint: "객체 접근자(.)와 구분자(,)를 구별하세요."
  },
  {
    level: 3,
    title: "Level 3: 리액트 훅 철자 테스트",
    correct: "useEffect(() => { fetch(); }, []);",
    wrong: "useEfect(() => { fetch(); }, []);",
    answer: "useEfect",
    hint: "이펙트(Effect)의 철자를 확인하세요."
  },
  {
    level: 4,
    title: "Level 4: 극한의 시력 테스트 (1 vs l)",
    correct: "const id = 1231;",
    wrong: "const id = 123l;",
    answer: "123l",
    hint: "마지막 글자가 숫자 1인지, 소문자 L인지 보세요."
  },
  {
    level: 5,
    title: "Level 5: 치사함의 끝 (특수기호)",
    correct: "data.map(item => item.id);",
    wrong: "data․map(item => item.id);",
    answer: "data․map",
    hint: "점(.)이 우리가 아는 그 점이 아닐 수도 있습니다."
  }
];

export default function BugHunter() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [timeLeft, setTimeLeft] = useState(30);
  const [inputValue, setInputValue] = useState('');
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
  const [showHint, setShowHint] = useState(false);
  const [hintStep, setHintStep] = useState(0); // 힌트 시퀀스 단계

  const handleCopy = (e: React.ClipboardEvent) => {
    e.preventDefault();
    alert("🚫 뇌 운동 중입니다! 복사는 금지되어 있습니다.");
  };

  useEffect(() => {
    if (gameState !== 'playing') return;
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setGameState('lost');
    }
  }, [timeLeft, gameState]);

  // 유머러스한 힌트 구매 로직
  const buyHint = () => {
    if (showHint) return;

    if (hintStep === 0) {
      alert("⚠️ 이 기능은 '프리미엄 뇌 활성 구독권'이 필요한 유료 서비스입니다.");
      const confirmPay = confirm("💰 힌트를 유료 결제하시겠습니까?\n(확인 클릭 시 계좌 조회가 시작됩니다)");
      
      if (confirmPay) {
        alert("🔍 잠시만 기다려주세요... 실시간 계좌 잔액 조회 중...");
        setTimeout(() => {
          alert("💸 ...조회 결과, 잔액이 0원입니다.");
          setHintStep(1);
        }, 800);
      }
    } else {
      alert("📢 [시스템] 개발자가 당신의 텅 빈 통장을 보고 눈물을 흘립니다.");
      alert("🎁 너무 불쌍해서 이번 레벨은 그냥 알려드릴게요. (공짜!)");
      setShowHint(true);
      setHintStep(0);
    }
  };

  const checkAnswer = () => {
    if (inputValue.trim() === PROBLEMS[currentLevel].answer) {
      if (currentLevel < PROBLEMS.length - 1) {
        alert("✅ 정답입니다!");
        setCurrentLevel(prev => prev + 1);
        setInputValue('');
        setTimeLeft(30);
        setShowHint(false);
        setHintStep(0);
      } else {
        setGameState('won');
      }
    } else {
      const nextHearts = hearts - 1;
      setHearts(nextHearts);
      setInputValue('');
      if (nextHearts <= 0) {
        setGameState('lost');
      } else {
        alert(`❌ 틀렸습니다! 남은 기회: ${nextHearts}번`);
      }
    }
  };

  if (gameState !== 'playing') {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#0d1117] text-white text-center p-6">
        <h1 className={`text-7xl font-black mb-4 ${gameState === 'lost' ? 'text-red-500' : 'text-green-400'}`}>
          {gameState === 'lost' ? 'GAME OVER' : 'VICTORY!'}
        </h1>
        <p className="mb-8 text-gray-400 text-xl">
          {gameState === 'lost' ? '당신의 시력과 집중력이 한계에 도달했습니다.' : '완벽합니다! 당신은 인간 디버거입니다.'}
        </p>
        <button onClick={() => window.location.reload()} className="px-12 py-5 bg-white text-black font-bold rounded-full text-2xl transition-transform hover:scale-110">
          다시 도전하기
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] p-6 md:p-12 font-sans" onCopy={handleCopy}>
      <header className="max-w-5xl mx-auto flex justify-between items-end mb-12 border-b border-gray-800 pb-8">
        <div>
          <h1 className="text-4xl font-black text-white mb-2">🧠 Alzheimer Defense</h1>
          <p className="text-gray-500">잘못된 부분을 그대로 입력하세요. (눈 크게 뜨세요!)</p>
        </div>
        <div className="text-right font-mono">
          <div className="text-3xl text-red-500 mb-2 font-bold">LIFE: {"❤️".repeat(hearts)}</div>
          <div className={`text-4xl font-bold ${timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-blue-400'}`}>
            TIME: {timeLeft}s
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 font-mono text-xl">
          <div className="space-y-3">
            <span className="text-sm font-bold text-gray-500 ml-1 font-sans uppercase tracking-widest">Normal Code</span>
            <div className="p-8 bg-[#161b22] border border-gray-800 rounded-2xl shadow-2xl relative">
              <code className="text-blue-300 whitespace-pre">{PROBLEMS[currentLevel].correct}</code>
            </div>
          </div>
          <div className="space-y-3">
            <span className="text-sm font-bold text-red-400 ml-1 font-sans uppercase tracking-widest font-bold">Buggy Code</span>
            <div className="p-8 bg-[#161b22] border border-red-900/20 rounded-2xl shadow-2xl relative select-none">
              <code className="text-pink-400 whitespace-pre">{PROBLEMS[currentLevel].wrong}</code>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center pt-12 border-t border-gray-800/50">
          <div className="w-full max-w-3xl flex gap-4">
            <input 
              autoFocus
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
              placeholder="틀린 글자를 입력하고 Enter!"
              className="flex-1 bg-[#0d1117] border-2 border-gray-700 rounded-2xl p-5 text-white text-2xl outline-none focus:border-blue-500 transition-all"
            />
            <button onClick={checkAnswer} className="px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl text-2xl transition-colors">제출</button>
          </div>
          
          <div className="mt-8">
            {showHint ? (
              <div className="bg-yellow-500/10 border border-yellow-500/30 p-5 rounded-xl text-yellow-500 text-lg animate-bounce">
                <strong>💡 특별 자비 힌트:</strong> {PROBLEMS[currentLevel].hint}
              </div>
            ) : (
              <button 
                onClick={buyHint}
                className="text-gray-500 hover:text-yellow-500 transition-colors underline decoration-dotted underline-offset-8 text-lg"
              >
                {hintStep === 0 ? "프리미엄 힌트 결제하기 (유료)" : "계좌 확인 완료... 다시 클릭하여 힌트 받기"}
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}