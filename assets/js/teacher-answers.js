import { getDiscussionById, getParticipantCount, getQuestionAnswersView } from './api.js';
import { APP_CONFIG } from './config.js';
import { qs, getQueryParam, readStorage, setMessage, formatDateTime, buildUrl, goTo } from './utils.js';

const discussionId = Number(getQueryParam('discussion_id'));
const questionId = Number(getQueryParam('question_id'));
const teacherToken = getQueryParam('token') || readStorage(APP_CONFIG.STORAGE_KEYS.teacherToken);

const discussionCodeEl = qs('#discussionCode');
const participantCountEl = qs('#participantCount');
const questionTextEl = qs('#questionText');
const answersTableBodyEl = qs('#answersTableBody');
const answersMessageEl = qs('#answersMessage');
const btnBackToQuestions = qs('#btnBackToQuestions');

if (!discussionId || !questionId) {
  alert('缺少必要參數，將回主畫面。');
  goTo('./index.html');
}

btnBackToQuestions?.addEventListener('click', () => {
  const url = buildUrl('./teacher-questions.html', {
    discussion_id: discussionId,
    token: teacherToken
  });
  goTo(url);
});

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function renderRows(rows) {
  if (!rows.length) {
    answersTableBodyEl.innerHTML = '<tr><td colspan="3" class="text-center text-muted">目前尚無參與者。</td></tr>';
    return;
  }

  answersTableBodyEl.innerHTML = rows.map(row => `
    <tr>
      <td>${escapeHtml(row.nickname || '')}</td>
      <td>${row.submitted_at ? formatDateTime(row.submitted_at) : ''}</td>
      <td class="answer-content-cell">${escapeHtml(row.content || '')}</td>
    </tr>
  `).join('');
}

async function refreshAll() {
  const [discussion, participantCount, view] = await Promise.all([
    getDiscussionById(discussionId),
    getParticipantCount(discussionId),
    getQuestionAnswersView(discussionId, questionId)
  ]);

  discussionCodeEl.textContent = discussion.join_code || '----';
  participantCountEl.textContent = participantCount;
  questionTextEl.textContent = view.question?.question_text || '查無問題';
  renderRows(view.rows || []);
}

refreshAll().catch(error => {
  setMessage(answersMessageEl, error.message || '載入回答列表失敗。', 'danger');
});

setInterval(() => {
  refreshAll().catch(() => {});
}, APP_CONFIG.POLLING_MS);
