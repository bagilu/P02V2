# BrainStormingSystem

GitHub Pages + Supabase 的簡易腦力激盪系統。

## 使用前請先做的事

1. 在 Supabase 建立以下資料表：
   - TblP02Discussions
   - TblP02Questions
   - TblP02Participants
   - TblP02Answers

2. 編輯 `assets/js/config.js`，填入：
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`

3. 將整個資料夾內容上傳到 GitHub repository。

4. 到 GitHub Pages 啟用網站。

## 頁面說明

- `index.html`：主畫面
- `teacher-questions.html`：教師管理問題區
- `teacher-answers.html`：教師查看回答
- `student-input.html`：學生輸入回答
- `student-waiting.html`：學生等待畫面

## 注意

目前前端假設您已經在 Supabase 中允許必要的讀寫權限。若之後要正式上線，建議再補：

- RLS
- 教師端權限保護
- Edge Function
- 更嚴格的資料驗證


## 補充

- 教師端問題區已加入「結束討論」按鈕。
- 結束後，該討論會改為 `closed`，同一組 4 位數代碼未來可再次被新討論使用。
