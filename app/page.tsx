'use client';

import React, { useState, useEffect } from 'react';

// 1. 단계별 문제 세트 (점점 더 치사해지는 난이도)
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

  // 복사 방지 기능
  const handleCopy = (e: React.ClipboardEvent) => {
    e.preventDefault();
    alert("🚫 뇌 운동 중입니다! 복사하기는 금지되어 있습니다.");
  };

  // 타이머 로직 (0초 시 패배 처리)
  useEffect(() => {
    if (gameState !== 'playing') return;

    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setGameState('lost'); // 시간 초과 시 패배
    }
  }, [timeLeft, gameState]);

  const checkAnswer = () => {
    if (inputValue.trim() === PROBLEMS[currentLevel].answer) {
      if (currentLevel < PROBLEMS.length - 1) {
        alert("✅ 정답입니다! 다음 단계로.");
        setCurrentLevel(prev => prev + 1);
        setInputValue('');
        setTimeLeft(30); // 시간 초기화
      } else {
        setGameState('won'); // 모든 문제 클리어
      }
    } else {
      const nextHearts = hearts - 1;
      setHearts(nextHearts);
      setInputValue('');
      if (nextHearts <= 0) {
        setGameState('lost'); // 하트 소진 패배
      } else {
        alert(`❌ 틀렸습니다! 남은 기회: ${nextHearts}번`);
      }
    }
  };

  // 게임 종료 화면 (패배/승리 분기)
  if (gameState !== 'playing') {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#0d1117] text-white text-center p-6">
        {gameState === 'lost' ? (
          <>
            <h1 className="text-7xl font-black mb-4 text-red-500 italic">GAME OVER</h1>
            <p className="text-2xl text-gray-400 mb-10">시간이 초과되었거나 기회를 모두 잃었습니다.</p>
          </>
        ) : (
          <>
            <h1 className="text-7xl font-black mb-4 text-green-400">VICTORY!</h1>
            <p className="text-2xl text-gray-400 mb-10">당신의 뇌는 20대만큼이나 건강하시군요!</p>
          </>
        )}
        <button 
          onClick={() => window.location.reload()}
          className="px-12 py-5 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all text-2xl shadow-lg shadow-white/10"
        >
          다시 도전하기
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] p-6 md:p-12 font-sans selection:bg-blue-500/30" onCopy={handleCopy}>
      {/* 헤더 섹션 */}
      <header className="max-w-5xl mx-auto flex justify-between items-end mb-12 border-b border-gray-800 pb-8">
        <div>
          <h1 className="text-4xl font-black text-white mb-2 tracking-tight">🧠 Alzheimer Defense</h1>
          <p className="text-gray-500 text-lg">오른쪽 [BUGGY CODE]에서 틀린 부분만 입력창에 적으세요.</p>
        </div>
        <div className="text-right font-mono">
          <div className="text-3xl text-red-500 mb-2 font-bold">LIFE: {"❤️".repeat(hearts)}</div>
          <div className={`text-4xl font-bold ${timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-blue-400'}`}>
            TIME: {timeLeft}s
          </div>
        </div>
      </header>

      {/* 게임 메인 화면 */}
      <main className="max-w-5xl mx-auto space-y-10">
        <div className="flex items-center gap-4">
          <span className="px-4 py-1 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 rounded-full text-sm font-bold">
            LEVEL 0{PROBLEMS[currentLevel].level}
          </span>
          <h2 className="text-2xl font-bold text-white">{PROBLEMS[currentLevel].title}</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 font-mono text-xl">
          {/* 정상 코드 */}
          <div className="space-y-3">
            <span className="text-sm font-bold text-gray-500 tracking-widest ml-1">NORMAL CODE</span>
            <div className="p-8 bg-[#161b22] border border-gray-800 rounded-2xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/50"></div>
              <code className="text-blue-300 whitespace-pre">{PROBLEMS[currentLevel].correct}</code>
            </div>
          </div>

          {/* 버그 코드 */}
          <div className="space-y-3">
            <span className="text-sm font-bold text-red-400 tracking-widest ml-1 animate-pulse">BUGGY CODE (FIND IT!)</span>
            <div className="p-8 bg-[#161b22] border border-red-900/20 rounded-2xl shadow-2xl relative overflow-hidden select-none">
              <div className="absolute top-0 left-0 w-1 h-full bg-red-500/50"></div>
              <code className="text-pink-400 whitespace-pre">{PROBLEMS[currentLevel].wrong}</code>
            </div>
          </div>
        </div>

        {/* 입력 섹션 */}
        <div className="flex flex-col items-center pt-12 border-t border-gray-800/50">
          <div className="w-full max-w-3xl flex gap-4">
            <input 
              autoFocus
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
              placeholder="여기에 틀린 단어를 입력 (Enter)"
              className="flex-1 bg-[#0d1117] border-2 border-gray-700 rounded-2xl p-5 text-white text-2xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-gray-700"
            />
            <button 
              onClick={checkAnswer}
              className="px-10 py-5 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-500 transition-all text-2xl active:scale-95 shadow-lg shadow-blue-900/20"
            >
              제출
            </button>
          </div>
          <div className="mt-8 flex items-center gap-2 text-gray-500">
            <span className="text-yellow-500 font-bold">💡 힌트:</span>
            <p className="text-lg italic">{PROBLEMS[currentLevel].hint}</p>
          </div>
        </div>
      </main>

      {/* 하단 푸터 */}
      <footer className="max-w-5xl mx-auto mt-20 text-center text-gray-600 text-sm">
        <p>© 2026 Alzheimer Defense Project. 코드 복사 금지 시스템 가동 중.</p>
      </footer>
    </div>
  );
}