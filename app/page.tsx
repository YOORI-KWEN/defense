'use client';

import React, { useState, useEffect } from 'react';

const PROBLEMS = [
  {
    level: 1,
    title: "Level 1",
    correct: "const [count, setCount] = useState(0);",
    wrong: "const [count, setcount] = useState(0);",
    answer: "setcount",
    hint: "리액트의 상태 변경 함수는 CamelCase를 사랑합니다. 대문자 하나가 부족하네요."
  },
  {
    level: 2,
    title: "Level 2",
    correct: "console.log('Error found!');",
    wrong: "console,log('Error found!');",
    answer: "console,log",
    hint: "마침표(.)와 쉼표(,)는 엄연히 다릅니다. 키보드 오른쪽 하단을 유심히 보세요."
  },
  {
    level: 3,
    title: "Level 3",
    correct: "const id = 1231;",
    wrong: "const id = 123l;",
    answer: "123l",
    hint: "알파벳 소문자 'l'과 숫자 '1'은 사이가 아주 나쁩니다."
  },
  {
    level: 4,
    title: "Level 4",
    correct: "if (user === 'admin') { }",
    wrong: "if (user ==- 'admin') { }",
    answer: "==-",
    hint: "자바스크립트에서 비교는 '='이지 '-'가 아닙니다. 오타가 났군요!"
  },
  {
    level: 5,
    title: "Level 5",
    correct: "return { success: true };",
    wrong: "return ; { success: true };",
    answer: ";",
    hint: "return 바로 뒤에 세미콜론을 찍으면 아무것도 반환되지 않습니다. (허무주의)"
  },
  {
    level: 6,
    title: "Level 6",
    correct: "const arr = [1, 2, 3];",
    wrong: "const arr = [1, 2. 3];",
    answer: "2.",
    hint: "배열 요소를 구분하는 건 마침표가 아니라 쉼표입니다. 당신의 뇌가 속고 있어요."
  },
  {
    level: 7,
    title: "Level 7",
    correct: "import React from 'react';",
    wrong: "impor t React from 'react';",
    answer: "impor t",
    hint: "단어 사이에 공백 하나가 침투했습니다. 스페이스바를 너무 세게 누르셨나요?"
  }
];

export default function BugHunter() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [timeLeft, setTimeLeft] = useState(30);
  const [inputValue, setInputValue] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // 복사 방지
  const handleCopy = (e: React.ClipboardEvent) => {
    e.preventDefault();
    alert("🚫 복사 금지! 뇌 근육을 직접 사용하세요!");
  };

  useEffect(() => {
    if (timeLeft > 0 && !isGameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setIsGameOver(true);
    }
  }, [timeLeft, isGameOver]);

  const checkAnswer = () => {
    if (inputValue.trim() === PROBLEMS[currentLevel].answer) {
      if (currentLevel < PROBLEMS.length - 1) {
        alert("✅ 버그 소탕 완료! 다음 단계로!");
        setCurrentLevel(prev => prev + 1);
        setInputValue('');
        setTimeLeft(30);
        setShowHint(false);
      } else {
        alert("🎉 대단합니다! 당신의 뇌는 20대 수준입니다!");
        setIsGameOver(true);
      }
    } else {
      setHearts(prev => prev - 1);
      setInputValue('');
      if (hearts <= 1) {
        setIsGameOver(true);
      }
    }
  };

  const handleHintClick = () => {
    const confirmPay = confirm("💰 힌트는 유료 서비스입니다. (부가가치세 별도)\n\n'확인'을 누르시면 당신의 미래 월급에서 55,000원이 자동 차감됩니다. 결제하시겠습니까?");
    if (confirmPay) {
      alert("💳 결제 승인 중... [잔액 부족]\n\n불쌍해서 이번만 무료로 보여드립니다.");
      setShowHint(true);
    }
  };

  if (isGameOver) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
        <h1 className="text-6xl font-black mb-8 text-red-500">{hearts <= 0 ? "GAME OVER" : "YOU WIN!"}</h1>
        <p className="text-2xl mb-10 text-gray-400">{hearts <= 0 ? "버그가 당신의 뇌를 지배했습니다." : "모든 버그를 박멸했습니다!"}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-10 py-4 bg-yellow-500 text-black font-bold rounded-xl hover:bg-yellow-400 transition-all text-xl"
        >
          다시 단련하기
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] p-4 md:p-10 font-sans select-none" onCopy={handleCopy}>
      <header className="max-w-5xl mx-auto flex justify-between items-center mb-10 border-b border-gray-700 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">🧠 알츠하이머 디펜스</h1>
          <p className="text-gray-400">틀린 부분(오타)을 찾아 입력창에 정확히 쓰세요.</p>
        </div>
        <div className="text-right font-mono">
          <div className="text-2xl text-red-500 mb-1">LIFE: {"❤️".repeat(hearts)}</div>
          <div className={`text-2xl ${timeLeft <= 10 ? 'text-orange-500 animate-pulse' : 'text-blue-400'}`}>
            TIME: {timeLeft}s
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto space-y-8">
        <div className="flex justify-between items-end">
            <h2 className="text-2xl font-semibold text-yellow-400">Level {currentLevel + 1}: {PROBLEMS[currentLevel].title}</h2>
            <span className="text-gray-500">{currentLevel + 1} / {PROBLEMS.length}</span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-mono text-lg">
          <div className="flex flex-col">
            <span className="text-xs text-green-500 mb-2 ml-2 font-bold">정상 코드 (Reference)</span>
            <div className="p-6 bg-[#161b22] border border-gray-800 rounded-lg overflow-x-auto shadow-inner">
              <code className="text-blue-300 whitespace-pre">{PROBLEMS[currentLevel].correct}</code>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-xs text-red-400 mb-2 ml-2 font-bold">버그 코드 (Buggy Code)</span>
            <div className="p-6 bg-[#161b22] border-2 border-red-900/30 rounded-lg overflow-x-auto shadow-inner">
              <code className="text-pink-400 whitespace-pre">{PROBLEMS[currentLevel].wrong}</code>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center pt-10 border-t border-gray-800">
          <div className="w-full max-w-2xl flex gap-3">
            <input 
              autoFocus
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
              placeholder="틀린 부분만 입력 (예: setcount)"
              className="flex-1 bg-[#0d1117] border-2 border-gray-600 rounded-lg p-4 text-white text-xl outline-none focus:border-blue-500 transition-all shadow-lg"
            />
            <button 
              onClick={checkAnswer}
              className="px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-500 transition-all text-xl shadow-lg"
            >
              제출
            </button>
          </div>
          
          <div className="mt-8 text-center">
            {showHint ? (
              <p className="text-green-400 italic text-lg animate-bounce">💡 {PROBLEMS[currentLevel].hint}</p>
            ) : (
              <button 
                onClick={handleHintClick}
                className="text-gray-500 underline hover:text-gray-300 transition-all"
              >
                힌트 보기 (유료 광고 포함)
              </button>
            )}
          </div>
        </div>
      </main>
      
      <footer className="mt-20 text-center text-gray-600 text-sm">
        버그를 잡는 동안 당신의 뇌 세포는 0.02% 활성화되었습니다.
      </footer>
    </div>
  );
}