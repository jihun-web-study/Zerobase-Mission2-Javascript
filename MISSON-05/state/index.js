const state = {
  category: "all",
};

function onChange(target, callback) {
  const handler = {
    set: function (obj, property, value) {
      // 속성 값이 실제로 변경될 때만 콜백 함수 실행
      if (obj[property] !== value) {
        obj[property] = value;
        callback(); // 값이 변할 때 실행할 함수
      }
      return true; // 성공적으로 값이 설정되었음을 나타냄
    },
  };

  return new Proxy(target, handler);
}

// 사용 예시
export const person = onChange(state, function () {
  console.log("값이 변경되었습니다.");
});

console.log(person);

export default state;
