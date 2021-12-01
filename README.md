# Quiz 앱

[Trivia](https://opentdb.com/api_config.php)에서 무작위로 10개의 질문 리스트를 받아와 사용자가 퀴즈를 풀 수 있도록 구현한 앱입니다.

## 스크린샷
![IMG_3346](https://user-images.githubusercontent.com/47589599/144188277-d17d3b15-986d-4cb1-acbb-98a3063e5fe7.png)
![IMG_3347](https://user-images.githubusercontent.com/47589599/144188282-f091b10c-78f6-4ae9-9c9b-f64ab1bbbafe.png)
![IMG_3348](https://user-images.githubusercontent.com/47589599/144188283-7e2e2537-7c51-4265-bf1c-c3071be0f091.png)
![IMG_3349](https://user-images.githubusercontent.com/47589599/144188285-f0bcb38b-e1c4-4963-aeab-9a5923ddd332.png)
![IMG_3351](https://user-images.githubusercontent.com/47589599/144188294-93dfc662-f496-43ac-ad58-30074d6c18ac.png)
![IMG_3352](https://user-images.githubusercontent.com/47589599/144188298-7b1c7859-03a8-4018-b272-be26c4817f12.png)

## 구현 기능

- '퀴즈 시작' 버튼을 클릭하여 퀴즈풀이를 시작할 수 있습니다.
- 4지선다 혹은 참/거짓 형태의 보기 중 하나를 선택할 수 있습니다.
- 답안 선택 후, 즉시 정답 여부를 확인할 수 있으며, '계속하기' 버튼을 클릭하여 다음 문항으로 넘어갈 수 있습니다.
- 퀴즈 풀이 중 'X' 버튼을 클릭하면 풀이 중인 퀴즈를 종료할 수 있으며, 풀이 중인 퀴즈를 이어서 풀 수 있습니다.
- 퀴즈 풀이가 끝나면 퀴즈를 마칠 때 까지 소요된 시간이 표시됩니다.
- 퀴즈 풀이가 끝나면 정오답 개수 및 비율 표시됩니다.
- 퀴즈 풀이가 끝나면 '다시할래요' 버튼을 클릭하여 해당 퀴즈를 다시 풀 수 있습니다.
- 퀴즈 풀이가 끝나면 '확인했어요!' 버튼을 클릭하여 홈 화면으로 돌아갈 수 있습니다.
- '확인했어요!' 버튼을 클릭하면 틀린 문항이 firestore에 자동으로 기록됩니다.
- '오답 노트' 버튼을 클릭하면 이전에 틀린 문항을 확인할 수 있습니다.

## 사용된 기술 스택 

앱 개발에 사용된 기술 스택은 다음과 같습니다:

- react-native
- redux & redux-saga
- TypeScript
- styled-components

## 디렉토리 구조 🗂
프로젝트 디렉토리 구조는 다음과 같습니다:
```
root
│
└─ Router.tsx //  라우팅이 정의되어 있는 파일입니다.
└─ src
   │
   └─ apis // 서버 요청 api가 정의되어 있습니다.
   └─ assets // 이미지 에셋이 모여있습니다.
   └─ components // 컴포넌트 파일이 모여있습니다.
   └─ screens // 스크린 파일이 모여있습니다.
   └─ store // redux 모듈이 정의되어 있습니다.
   └─ themes // 컬러 및 이미지 객체가 정의되어 있습니다.
   └─ types // 타입이 정의되어 있습니다.
   └─ utils  // 재사용 함수가 정의되어 있습니다.
```

## 실행 🏃‍♀️

디펜던시 설치 후, `yarn ios` 혹은 `yarn android` 명령을 사용하여 프로젝트를 실행합니다.

```sh
$ yarn install
$ yarn ios 혹은 yarn android
```
