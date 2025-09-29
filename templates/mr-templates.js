export const MR_TEMPLATES = {
  Bugfix: {
    name: "Bugfix",
    guidance:
      "- Explain the issue clearly with impact.\n- Provide root cause and fix details.\n- List verification and rollback steps.\n- Call out UI changes if any.",
    sections: [
      "🐛 Bug Fix / 🚨 Hotfix Merge Request",
      "🎯 Issue Summary",
      "🔧 Fix Applied",
      "🧪 Testing",
      "📱 UI/UX Changes",
      "🚀 Deployment",
      "📋 Checklist",
      "⚠️ Notes",
    ],
    template: `## 🐛 Bug Fix / 🚨 Hotfix Merge Request

**Type:** [Bug Fix / Hotfix]  
**Priority:** [Critical/High/Medium/Low]  
**Trello Card:** [Link to Trello card]

---

## 🎯 Issue Summary
**Problem:** [Brief description of the issue]  
**Impact:** [Who is affected and how]  
**Root Cause:** [What caused this issue]

---

## 🔧 Fix Applied
- [ ] [List the specific changes made]  
- [ ] [Include any workarounds or temporary fixes]

---

## 🧪 Testing
- [ ] Issue can no longer be reproduced  
- [ ] No new bugs introduced  
- [ ] Tested across browsers (Chrome, Firefox, Safari, Edge)  
- [ ] Mobile testing completed  

---

## 📱 UI/UX Changes
[If applicable, describe any visual changes]  

**Screenshots:** [Attach before/after if UI changes]

---

## 🚀 Deployment
- [ ] Ready for deployment  
- [ ] Rollback plan prepared (for hotfixes)  
- [ ] Environment variables updated (if needed)  

---

## 📋 Checklist
- [ ] No console errors  
- [ ] Follows project style guidelines  
- [ ] Trello card moved to "Code Review"  

---

## ⚠️ Notes
[Any special considerations, rollback procedures, or follow-up actions needed]
    `,
  },

  Feature: {
    name: "Feature",
    guidance:
      "- Highlight business value and purpose.\n- Break down user story, acceptance criteria, and changes.\n- Cover testing, performance, and UI/UX.\n- Mention deployment requirements.",
    sections: [
      "🚀 Feature / Refactor / Improvement / Enhancement Merge Request",
      "🎯 What does this change accomplish?",
      "🧪 Testing",
      "📱 UI/UX Changes",
      "📚 Documentation",
      "🚀 Deployment",
      "📋 Checklist",
      "📊 Performance Impact",
      "🔍 Code Review Notes",
    ],
    template: `## 🚀 Feature / Refactor / Improvement / Enhancement Merge Request

**Type:** [Feature / Refactor / Improvement / Enhancement]  
**Trello Card:** [Link to Trello card or card ID]  

**Summary:** [Brief description of what this MR accomplishes]

---

## 🎯 What does this change accomplish?
[Provide a clear, concise description of the changes and their purpose]

### Change Overview:
- **Purpose:** [What is the goal of this change?]  
- **User Story:** [As a user, I want to... so that...]  
- **Acceptance Criteria:** [List the acceptance criteria]  
- **Business Value:** [Why this change is important]

### Changes Made:
- [ ] [List the main changes made]  
- [ ] [Include any new features added]  
- [ ] [Mention any refactored code]  
- [ ] [Note any improvements made]  
- [ ] [Mention any removed functionality]  
- [ ] [Note any breaking changes]

---

## 🧪 Testing
### Test Cases:
- [ ] [List test scenarios covered]  
- [ ] [Include manual testing steps]  

### Browser/Device Testing:
- [ ] Chrome, Firefox, Safari, Edge (Desktop)  
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)  

### Frontend-Specific Testing:
- [ ] Component rendering and user interactions  
- [ ] Responsive design breakpoints verified  
- [ ] Accessibility (ARIA labels, keyboard navigation)  
- [ ] Performance metrics (LCP, FID, CLS)  

---

## 📱 UI/UX Changes
[Describe any user interface and user experience changes]

### Screenshots:
[Attach before/after screenshots if UI changes are made]  

### Responsive Design:
- [ ] Desktop, Tablet, Mobile  
- [ ] Touch interactions and hover states verified  

### Design System:
- [ ] Follows established component patterns and styling  

---

## 📚 Documentation
- [ ] Code comments added/updated  
- [ ] README updated (if applicable)  
- [ ] [Other documentation needs]  

---

## 🚀 Deployment
### Environment Variables:
[List any new environment variables or configuration changes]  

### Dependencies:
- [ ] New packages added/updated  
- [ ] Bundle size impact assessed  

---

## 📋 Checklist
- [ ] Code follows project style guidelines  
- [ ] No console errors or warnings  
- [ ] Remove stray comments, unused code/files/variables  
- [ ] Performance and accessibility verified  
- [ ] Cross-browser compatibility tested  
- [ ] Trello card moved to "Code Review"  

---

## 📊 Performance Impact
- [ ] No performance impact  
- [ ] Performance improved  
- [ ] Performance degraded (explain below)  

---

## 🔍 Code Review Notes
[Any specific areas you'd like reviewers to focus on]  
    `,
  },
}
