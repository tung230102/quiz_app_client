import { Box } from "@mui/material";

import { useTitleDynamic } from "~/hooks";

function Dashboard({ children }) {
  useTitleDynamic("Dashboard");

  return (
    <Box p={2}>
      {children}
      <Box flex={6} p={2}>
        <div>
          1. Support user registration function, login, forgot password is
          required
        </div>
        <div> 2. Check role for admin, user (response from BE)</div>
        <div>
          3. Use Token Based Authentication with access token, refresh token.
        </div>
        <div> 4. Use MUI or Ant Library for UI Components</div>
        <div>
          5. Once logged in, if role is only "user", the first page displays the
          Play Screen.
          <div>
            Play Screen. If role is admin or both, the first page displays the
            Admin screen. Play Screen.
          </div>
        </div>
        <div>
          6. At Admin Screen, admin can select 2 options: go to Play Screen or
          go to Management screens
        </div>
        <div>
          NOTE: Be careful with the permissions. A normal user cannot access to
          admin's Screen and admin's routes. And please auto refresh token when
          access token was expired.
        </div>
        <div></div> *******************************Play
        Screen*******************************
        <div>
          1. Play Screen: User can select number of questionss, that they want
          to play
        </div>
        <div>
          2. Click "Save and next" to save the results and go to the next
          question, back to return to the previous question (Optional: Support
          skip question).
        </div>
        <div> 3. Questions can choose at least 1 answers.</div>
        <div>
          4. Show a list of selected questions and answers along with the
          correct answer and total score after completing the survey.
        </div>
        <div>
          *******************************Management
          screens*******************************
        </div>
        <div> 1. Question management screen must has:</div>
        <div> 1.1. One table displays list of questions</div>
        <div> Every row must have at least some fields:</div>
        <div>- Sequence number (not to be confused with id)</div>
        <div> - Title of question</div>
        <div> - Created day</div>
        <div> - Thumbnail (if have)</div>
        <div>
          1.2. A button, when click this button, admin can add a new question
          and its answers
          <div>
            its answers FE developer can custom behavior for this button
            (options in 1.2.1) its answers
          </div>
        </div>
        <div>
          1.2.1. Open new Modal to add new question, or go to new screen to add
          (but make sure modal or screen is pretty)
        </div>
        <div>
          1.2.2. When create/ update a question (in screen/modal 1.2.1), admin
          can upload a thumbnail for question
        </div>
        <div>
          2. When click to specific question in table (1.1), admin can view
          detail question and its answer
        </div>
        <div>
          3. At (2), admin can edit or delete specific question and its answers
        </div>
        <div> 4. Account management screen: Similar 1,2,3 requirements </div>
        <div>
          5. Please implement search, pagination functions on UI (API of BE
          support those)
        </div>
        <div>
          *******************************Login
          screen*******************************
        </div>
        <div> 1. Has input boxes for email, password</div>
        <div> 2. User can go to Register screen from here</div>
        <div>
          3. User can forgot password and go to Forgot password screen from here
        </div>
        <div>
          *******************************Register
          screen******************************
        </div>
        <div> 1. Has input boxes for email, password, name</div>
        <div>
          *******************************Forgot password
          screen******************************
        </div>
        <div>1. Has an input box for email</div>
        <div>
          *******************************Profile screen
          (Optional)******************************
        </div>
        <div> 1. In this screen, an user can view own profile</div>
        <div> 2. He/she can view his/her base information</div>
        <div> 3. User can change password, avatar in this screen</div>
      </Box>
      ;
    </Box>
  );
}

export default Dashboard;
