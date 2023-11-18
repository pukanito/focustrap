import { Focusable } from './focusable';
import { screen } from '@testing-library/dom';

describe('Focusable', () => {
  enum Details {
    None,
    VisibilityHidden,
  }

  //region anchor
  const anchor = {
    html: `<a href="#" data-testid="test-element">Focus</a>`,
    focus: true,
    details: Details.None,
  };
  const anchorHidden = {
    html: `<a href="#" hidden>'hidden' should not get focus</a>`,
    focus: false,
    details: Details.None,
  };
  const anchorVisibilityHidden = {
    html: `<a href="#" style="visibility: hidden" >'visibility: hidden' should not get focus</a>`,
    focus: false,
    details: Details.VisibilityHidden,
  };
  const anchorDisplayNone = {
    html: `<a href="#" style="display: none" >'display: none' should not get focus</a>`,
    focus: false,
    details: Details.None,
  };
  const anchorWithoutHref = {
    html: `<a>'a' without href should not get focus</a>`,
    focus: false,
    details: Details.None,
  };
  //endregion
  //region area
  const area = {
    html: `<img src="#" alt="Test" usemap="#workMap" width="400" height="379">
            <map name="workMap">
              <area shape="rect" coords="34,44,270,350" alt="Computer">
              <area shape="rect" coords="290,172,333,250" alt="Phone" href="#" data-testid="test-element">
              <area shape="circle" coords="337,300,44" alt="Cup of coffee" href="#">
            </map>`,
    focus: true,
    details: Details.None,
  };
  const areaHidden = {
    html: `<img src="#" alt="Test" usemap="#workMap" width="400" height="379">
            <map name="workMap">
              <area shape="rect" coords="34,44,270,350" alt="Computer">
              <area shape="rect" coords="290,172,333,250" alt="Phone" href="#" data-testid="test-element" hidden>
              <area shape="circle" coords="337,300,44" alt="Cup of coffee" href="#">
            </map>`,
    focus: true,
    details: Details.None,
  };
  const areaVisibilityHidden = {
    html: `<img src="#" alt="Test" usemap="#workMap" width="400" height="379">
            <map name="workMap">
              <area shape="rect" coords="34,44,270,350" alt="Computer">
              <area shape="rect" coords="290,172,333,250" alt="Phone" href="#" data-testid="test-element" style="visibility: hidden">
              <area shape="circle" coords="337,300,44" alt="Cup of coffee" href="#">
            </map>`,
    focus: true,
    details: Details.VisibilityHidden,
  };
  const areaDisplayNone = {
    html: `<img src="#" alt="Test" usemap="#workMap" width="400" height="379">
            <map name="workMap">
              <area shape="rect" coords="34,44,270,350" alt="Computer">
              <area shape="rect" coords="290,172,333,250" alt="Phone" href="#" data-testid="test-element" style="display: none">
              <area shape="circle" coords="337,300,44" alt="Cup of coffee" href="#">
            </map>`,
    focus: true,
    details: Details.None,
  };
  const areaWithoutHref = {
    html: `<img src="#" alt="Test" usemap="#workMap" width="400" height="379">
            <map name="workMap">
              <area shape="rect" coords="34,44,270,350" alt="Computer">
              <area shape="rect" coords="290,172,333,250" alt="Phone">
              <area shape="circle" coords="337,300,44" alt="Cup of coffee">
            </map>`,
    focus: false,
    details: Details.None,
  };
  const areaWithImgHidden = {
    html: `<img src="#" alt="Test" usemap="#workMap" width="400" height="379" hidden>
            <map name="workMap">
              <area shape="rect" coords="34,44,270,350" alt="Computer">
              <area shape="rect" coords="290,172,333,250" alt="Phone" href="#">
              <area shape="circle" coords="337,300,44" alt="Cup of coffee" href="#">
            </map>`,
    focus: false,
    details: Details.None,
  };
  const areaWithImgVisibilityHidden = {
    html: `<img src="#" alt="Test" usemap="#workMap" width="400" height="379" style="visibility: hidden">
            <map name="workMap">
              <area shape="rect" coords="34,44,270,350" alt="Computer">
              <area shape="rect" coords="290,172,333,250" alt="Phone" href="#">
              <area shape="circle" coords="337,300,44" alt="Cup of coffee" href="#">
            </map>`,
    focus: false,
    details: Details.VisibilityHidden,
  };
  const areaWithImgDisplayNone = {
    html: `<img src="#" alt="Test" usemap="#workMap" width="400" height="379" style="display: none">
            <map name="workMap">
              <area shape="rect" coords="34,44,270,350" alt="Computer">
              <area shape="rect" coords="290,172,333,250" alt="Phone" href="#">
              <area shape="circle" coords="337,300,44" alt="Cup of coffee" href="#">
            </map>`,
    focus: false,
    details: Details.None,
  };
  const imgWithoutUsemap = {
    html: `<img src="#" alt="img without usemap attribute should not get focus"/>`,
    focus: false,
    details: Details.None,
  };
  //endregion
  //region button
  const button = {
    html: `<button data-testid="test-element">Focus</button>`,
    focus: true,
    details: Details.None,
  };
  const buttonHidden = {
    html: `<button hidden>Hidden button should not get focus</button>`,
    focus: false,
    details: Details.None,
  };
  const buttonVisibilityHidden = {
    html: `<button style="visibility: hidden" >Hidden button should not get focus</button>`,
    focus: false,
    details: Details.VisibilityHidden,
  };
  const buttonDisplayNone = {
    html: `<button style="display: none" >Hidden button should not get focus</button>`,
    focus: false,
    details: Details.None,
  };
  const buttonDisabled = {
    html: `<button disabled >Disabled button should not get focus</button>`,
    focus: false,
    details: Details.None,
  };
  const buttonInsideFieldset = {
    html: `<fieldset>
              <button data-testid="test-element">Focus</button>
            </fieldset>`,
    focus: true,
    details: Details.None,
  };
  const buttonInsideFieldsetDisabled = {
    html: `<fieldset disabled>
              <button>No focus</button>
            </fieldset>`,
    focus: false,
    details: Details.None,
  };
  const buttonInsideLegendInsideFieldsetDisabled = {
    html: `<fieldset disabled>
              <legend>
                <button data-testid="test-element">Focus</button>
              </legend>
            </fieldset>`,
    focus: true,
    details: Details.None,
  };
  const buttonDeepInsideLegendInsideFieldsetDisabled = {
    html: `<fieldset disabled>
              <legend>
                <div>
                  <button data-testid="test-element">Focus</button>
                </div>
              </legend>
            </fieldset>`,
    focus: true,
    details: Details.None,
  };
  const buttonInsideLegendHiddenInsideFieldset = {
    html: `<fieldset>
              <legend hidden>
                <button>No focus</button>
              </legend>
            </fieldset>`,
    focus: false,
    details: Details.None,
  };
  const buttonInsideLegendVisibilityHiddenInsideFieldset = {
    html: `<fieldset>
              <legend style="visibility:hidden;">
                <button>No focus</button>
              </legend>
            </fieldset>`,
    focus: false,
    details: Details.VisibilityHidden,
  };
  const buttonInsideLegendDisplayNoneInsideFieldset = {
    html: `<fieldset>
              <legend style="display:none">
                <button>No focus</button>
              </legend>
            </fieldset>`,
    focus: false,
    details: Details.None,
  };
  //endregion
  //region details/summary
  const summary = {
    html: `<details>
              <summary data-testid="test-element">Test</summary>
              <p>Test description.</p>
            </details>`,
    focus: true,
    details: Details.None,
  };
  const detailsWithoutSummary = {
    html: `<details data-testid="test-element">
              <p>Test description.</p>
            </details>`,
    focus: true,
    details: Details.None,
  };
  const detailsWithSummaryHidden = {
    html: `<details>
              <summary hidden>Test</summary>
              <p>Test description.</p>
            </details>`,
    focus: false,
    details: Details.None,
  };
  const hiddenDetailsWithSummary = {
    html: `<details hidden>
              <summary>Test</summary>
              <p>Test description.</p>
            </details>`,
    focus: false,
    details: Details.None,
  };
  const hiddenDetailsWithoutSummary = {
    html: `<details hidden>
              <p>Test description.</p>
            </details>`,
    focus: false,
    details: Details.None,
  };
  //endregion
  //region input
  const input = {
    html: `<input type="text" aria-label="input should get focus" data-testid="test-element">`,
    focus: true,
    details: Details.None,
  };
  const inputTypeHidden = {
    html: `<input type="hidden" aria-label="'type=hidden' input should not get focus">`,
    focus: false,
    details: Details.None,
  };
  const inputHidden = {
    html: `<input type="text" hidden aria-label="hidden input should not get focus">`,
    focus: false,
    details: Details.None,
  };
  const inputVisibilityHidden = {
    html: `<input type="text" style="visibility: hidden" aria-label="visibility hidden input should not get focus">`,
    focus: false,
    details: Details.VisibilityHidden,
  };
  const inputDisplayNone = {
    html: `<input type="text" style="display: none" aria-label="display none input should not get focus">`,
    focus: false,
    details: Details.None,
  };
  const inputDisabled = {
    html: `<input type="text" disabled aria-label="disabled input should not get focus">`,
    focus: false,
    details: Details.None,
  };
  const inputInsideFieldset = {
    html: `<fieldset>
              <input type="text" aria-label="input should get focus" data-testid="test-element">
            </fieldset>`,
    focus: true,
    details: Details.None,
  };
  const inputInsideFieldsetDisabled = {
    html: `<fieldset disabled>
              <input type="text" aria-label="input should not get focus">
            </fieldset>`,
    focus: false,
    details: Details.None,
  };
  const inputInsideLegendInsideFieldsetDisabled = {
    html: `<fieldset disabled>
              <legend>
                <input type="text" aria-label="input should get focus" data-testid="test-element">
              </legend>
            </fieldset>`,
    focus: true,
    details: Details.None,
  };
  const inputDeepInsideLegendInsideFieldsetDisabled = {
    html: `<fieldset disabled>
              <legend>
                <div>
                  <input type="text" aria-label="input should get focus" data-testid="test-element">
                </div>
              </legend>
            </fieldset>`,
    focus: true,
    details: Details.None,
  };
  const inputInsideLegendHiddenInsideFieldset = {
    html: `<fieldset>
              <legend hidden>
                <input type="text" aria-label="input should not get focus">
              </legend>
            </fieldset>`,
    focus: false,
    details: Details.None,
  };
  const inputInsideLegendVisibilityHiddenInsideFieldset = {
    html: `<fieldset>
              <legend style="visibility:hidden;">
                <input type="text" aria-label="input should not get focus">
              </legend>
            </fieldset>`,
    focus: false,
    details: Details.VisibilityHidden,
  };
  const inputInsideLegendDisplayNoneInsideFieldset = {
    html: `<fieldset>
              <legend style="display:none">
                <input type="text" aria-label="input should not get focus">
              </legend>
            </fieldset>`,
    focus: false,
    details: Details.None,
  };
  const radioButtonFirstChecked = {
    html: `<fieldset>
            <legend>Radio buttons:</legend>
            <div>
              <input type="radio" id="r1" name="radios" value="r1" checked data-testid="test-element" />
              <label for="r1">r1</label>
            </div>
            <div>
              <input type="radio" id="r2" name="radios" value="r2" />
              <label for="r2">r2</label>
            </div>
          </fieldset>`,
    focus: true,
    details: Details.None,
  };
  const radioButtonSecondChecked = {
    html: `<fieldset>
            <legend>Radio buttons:</legend>
            <div>
              <input type="radio" id="r1" name="radios" value="r1" />
              <label for="r1">r1</label>
            </div>
            <div>
              <input type="radio" id="r2" name="radios" value="r2" checked data-testid="test-element" />
              <label for="r2">r2</label>
            </div>
          </fieldset>`,
    focus: true,
    details: Details.None,
  };
  const radioButtonsAllUnchecked = {
    html: `<fieldset>
            <legend>Radio buttons:</legend>
            <div>
              <input type="radio" id="r1" name="radios" value="r1" data-testid="test-element" />
              <label for="r1">r1</label>
            </div>
            <div>
              <input type="radio" id="r2" name="radios" value="r2" />
              <label for="r2">r2</label>
            </div>
          </fieldset>`,
    focus: true,
    details: Details.None,
  };
  //endregion
  //region select
  const select = {
    html: `<label for="selecttest">Choose an item:</label>
           <select name="selecttest" id="selecttest" data-testid="test-element">
             <option value="item1">Item 1</option>
             <option value="item2">Item 2</option>
           </select>`,
    focus: true,
    details: Details.None,
  };
  const selectHidden = {
    html: `<label for="selecttest">Choose an item:</label>
           <select hidden name="selecttest" id="selecttest">
             <option value="item1">Item 1</option>
             <option value="item2">Item 2</option>
           </select>`,
    focus: false,
    details: Details.None,
  };
  const selectVisibilityHidden = {
    html: `<label for="selecttest">Choose an item:</label>
           <select style="visibility: hidden" name="selecttest" id="selecttest">
             <option value="item1">Item 1</option>
             <option value="item2">Item 2</option>
           </select>`,
    focus: false,
    details: Details.VisibilityHidden,
  };
  const selectDisplayNone = {
    html: `<label for="selecttest">Choose an item:</label>
           <select style="display: none" name="selecttest" id="selecttest">
             <option value="item1">Item 1</option>
             <option value="item2">Item 2</option>
           </select>`,
    focus: false,
    details: Details.None,
  };
  const selectDisabled = {
    html: `<label for="selecttest">Choose an item:</label>
           <select disabled name="selecttest" id="selecttest">
             <option value="item1">Item 1</option>
             <option value="item2">Item 2</option>
           </select>`,
    focus: false,
    details: Details.None,
  };
  const selectInsideFieldset = {
    html: `<fieldset>
              <label for="selecttest">Choose an item:</label>
              <select name="selecttest" id="selecttest" data-testid="test-element">
                <option value="item1">Item 1</option>
                <option value="item2">Item 2</option>
              </select>
            </fieldset>`,
    focus: true,
    details: Details.None,
  };
  const selectInsideFieldsetDisabled = {
    html: `<fieldset disabled>
              <label for="selecttest">Choose an item:</label>
              <select name="selecttest" id="selecttest">
                <option value="item1">Item 1</option>
                <option value="item2">Item 2</option>
              </select>
            </fieldset>`,
    focus: false,
    details: Details.None,
  };
  const selectInsideLegendInsideFieldsetDisabled = {
    html: `<fieldset disabled>
              <legend>
                <label for="selecttest">Choose an item:</label>
                <select name="selecttest" id="selecttest" data-testid="test-element">
                  <option value="item1">Item 1</option>
                  <option value="item2">Item 2</option>
                </select>
            </fieldset>`,
    focus: true,
    details: Details.None,
  };
  const selectDeepInsideLegendInsideFieldsetDisabled = {
    html: `<fieldset disabled>
              <legend>
                <div>
                  <label for="selecttest">Choose an item:</label>
                  <select name="selecttest" id="selecttest" data-testid="test-element">
                    <option value="item1">Item 1</option>
                    <option value="item2">Item 2</option>
                  </select>
                </div>
              </legend>
            </fieldset>`,
    focus: true,
    details: Details.None,
  };
  const selectInsideLegendHiddenInsideFieldset = {
    html: `<fieldset>
              <legend hidden>
                <label for="selecttest">Choose an item:</label>
                <select name="selecttest" id="selecttest">
                  <option value="item1">Item 1</option>
                  <option value="item2">Item 2</option>
                </select>
              </legend>
            </fieldset>`,
    focus: false,
    details: Details.None,
  };
  const selectInsideLegendVisibilityHiddenInsideFieldset = {
    html: `<fieldset>
              <legend style="visibility:hidden;">
                <label for="selecttest">Choose an item:</label>
                <select name="selecttest" id="selecttest">
                  <option value="item1">Item 1</option>
                  <option value="item2">Item 2</option>
                </select>
              </legend>
            </fieldset>`,
    focus: false,
    details: Details.VisibilityHidden,
  };
  const selectInsideLegendDisplayNoneInsideFieldset = {
    html: `<fieldset>
              <legend style="display:none">
                <label for="selecttest">Choose an item:</label>
                <select name="selecttest" id="selecttest">
                  <option value="item1">Item 1</option>
                  <option value="item2">Item 2</option>
                </select>
              </legend>
            </fieldset>`,
    focus: false,
    details: Details.None,
  };
  //endregion
  //region textArea
  const textArea = {
    html: `<label for="textarea">Textarea:</label>
           <textarea id="textarea" name="textarea1" rows="4" cols="50" data-testid="test-element">
           Focus.
           </textarea>`,
    focus: true,
    details: Details.None,
  };
  const textAreaHidden = {
    html: `<label for="textarea">Textarea:</label>
           <textarea hidden id="textarea" name="textarea1" rows="4" cols="50">
           No focus.
           </textarea>`,
    focus: false,
    details: Details.None,
  };
  const textAreaVisibilityHidden = {
    html: `<label for="textarea">Textarea:</label>
           <textarea style="visibility: hidden" id="textarea" name="textarea1" rows="4" cols="50">
           No focus.
           </textarea>`,
    focus: false,
    details: Details.VisibilityHidden,
  };
  const textAreaDisplayNone = {
    html: `<label for="textarea">Textarea:</label>
           <textarea style="display: none" id="textarea" name="textarea1" rows="4" cols="50">
           No focus.
           </textarea>`,
    focus: false,
    details: Details.None,
  };
  const textAreaDisabled = {
    html: `<label for="textarea">Textarea:</label>
           <textarea disabled id="textarea" name="textarea1" rows="4" cols="50">
           No focus.
           </textarea>`,
    focus: false,
    details: Details.None,
  };
  const textAreaInsideFieldset = {
    html: `<fieldset>
              <label for="textarea">Textarea:</label>
              <textarea id="textarea" name="textarea1" rows="4" cols="50" data-testid="test-element">
              Focus.
              </textarea>
            </fieldset>`,
    focus: true,
    details: Details.None,
  };
  const textAreaInsideFieldsetDisabled = {
    html: `<fieldset disabled>
              <label for="textarea">Textarea:</label>
              <textarea disabled id="textarea" name="textarea1" rows="4" cols="50">
              No focus.
              </textarea>
            </fieldset>`,
    focus: false,
    details: Details.None,
  };
  const textAreaInsideLegendInsideFieldsetDisabled = {
    html: `<fieldset disabled>
              <legend>
                <label for="textarea">Textarea:</label>
                <textarea id="textarea" name="textarea1" rows="4" cols="50" data-testid="test-element">
                Focus.
                </textarea>
              </legend>
            </fieldset>`,
    focus: true,
    details: Details.None,
  };
  const textAreaDeepInsideLegendInsideFieldsetDisabled = {
    html: `<fieldset disabled>
              <legend>
                <div>
                  <label for="textarea">Textarea:</label>
                  <textarea id="textarea" name="textarea1" rows="4" cols="50" data-testid="test-element">
                  Focus.
                  </textarea>
                </div>
              </legend>
            </fieldset>`,
    focus: true,
    details: Details.None,
  };
  const textAreaInsideLegendHiddenInsideFieldset = {
    html: `<fieldset>
              <legend hidden>
                <label for="textarea">Textarea:</label>
                <textarea id="textarea" name="textarea1" rows="4" cols="50">
                No focus.
                </textarea>
              </legend>
            </fieldset>`,
    focus: false,
    details: Details.None,
  };
  const textAreaInsideLegendVisibilityHiddenInsideFieldset = {
    html: `<fieldset>
              <legend style="visibility:hidden;">
                <label for="textarea">Textarea:</label>
                <textarea id="textarea" name="textarea1" rows="4" cols="50">
                No focus.
                </textarea>
              </legend>
            </fieldset>`,
    focus: false,
    details: Details.VisibilityHidden,
  };
  const textAreaInsideLegendDisplayNoneInsideFieldset = {
    html: `<fieldset>
              <legend style="display:none">
                <label for="textarea">Textarea:</label>
                <textarea id="textarea" name="textarea1" rows="4" cols="50">
                No focus.
                </textarea>
              </legend>
            </fieldset>`,
    focus: false,
    details: Details.None,
  };
  //endregion
  //region audio
  const audio = {
    html: `<audio controls data-testid="test-element"><source src="#" type="audio/mpeg">'audio' with controls attribute should get focus</audio>`,
    focus: true,
    details: Details.None,
  };
  const audioWithoutControls = {
    html: `<audio>'audio' without controls attribute should not get focus</audio>`,
    focus: false,
    details: Details.None,
  };
  //endregion
  //region video
  const video = {
    html: `<video controls data-testid="test-element"><source src="#" type="video/mp4">'video' with controls attribute should get focus</video>`,
    focus: true,
    details: Details.None,
  };
  const videoWithoutControls = {
    html: `<video>'video' without controls attribute should not get focus</video>`,
    focus: false,
    details: Details.None,
  };
  //endregion
  //region contentEditable
  const contentEditableEmpty = {
    html: `<div>
          <blockquote contenteditable="" data-testid="test-element">
            <p>should get focus on blockquote</p>
          </blockquote>
        </div>`,
    focus: true,
    details: Details.None,
  };
  const contentEditableTrue = {
    html: `<div>
         <cite contenteditable="true" data-testid="test-element">should get focus on cite</cite>
        </div>`,
    focus: true,
    details: Details.None,
  };
  //endregion

  const simpleFocusCases: { html: string; focus: boolean; details: Details }[] =
    [
      //region anchor
      { ...anchor },
      { ...anchorHidden },
      { ...anchorVisibilityHidden },
      { ...anchorDisplayNone },
      { ...anchorWithoutHref },
      //endregion
      //region area
      { ...area },
      { ...areaHidden },
      { ...areaVisibilityHidden },
      { ...areaDisplayNone },
      { ...areaWithoutHref },
      { ...areaWithImgHidden },
      { ...areaWithImgVisibilityHidden },
      { ...areaWithImgDisplayNone },
      { ...imgWithoutUsemap },
      //endregion
      //region button
      { ...button },
      { ...buttonHidden },
      { ...buttonVisibilityHidden },
      { ...buttonDisplayNone },
      { ...buttonDisabled },
      { ...buttonInsideFieldset },
      { ...buttonInsideFieldsetDisabled },
      { ...buttonInsideLegendInsideFieldsetDisabled },
      { ...buttonDeepInsideLegendInsideFieldsetDisabled },
      { ...buttonInsideLegendHiddenInsideFieldset },
      { ...buttonInsideLegendVisibilityHiddenInsideFieldset },
      { ...buttonInsideLegendDisplayNoneInsideFieldset },
      //endregion
      //region details/summary
      { ...summary },
      { ...detailsWithoutSummary },
      { ...detailsWithSummaryHidden },
      { ...hiddenDetailsWithSummary },
      { ...hiddenDetailsWithoutSummary },
      //endregion
      //region input
      { ...input },
      { ...inputTypeHidden },
      { ...inputHidden },
      { ...inputVisibilityHidden },
      { ...inputDisplayNone },
      { ...inputDisabled },
      { ...inputInsideFieldset },
      { ...inputInsideFieldsetDisabled },
      { ...inputInsideLegendInsideFieldsetDisabled },
      { ...inputDeepInsideLegendInsideFieldsetDisabled },
      { ...inputInsideLegendHiddenInsideFieldset },
      { ...inputInsideLegendVisibilityHiddenInsideFieldset },
      { ...inputInsideLegendDisplayNoneInsideFieldset },
      { ...radioButtonFirstChecked },
      { ...radioButtonSecondChecked },
      { ...radioButtonsAllUnchecked },
      //endregion
      //region select
      { ...select },
      { ...selectHidden },
      { ...selectVisibilityHidden },
      { ...selectDisplayNone },
      { ...selectDisabled },
      { ...selectInsideFieldset },
      { ...selectInsideFieldsetDisabled },
      { ...selectInsideLegendInsideFieldsetDisabled },
      { ...selectDeepInsideLegendInsideFieldsetDisabled },
      { ...selectInsideLegendHiddenInsideFieldset },
      { ...selectInsideLegendVisibilityHiddenInsideFieldset },
      { ...selectInsideLegendDisplayNoneInsideFieldset },
      //endregion
      //region textArea
      { ...textArea },
      { ...textAreaHidden },
      { ...textAreaVisibilityHidden },
      { ...textAreaDisplayNone },
      { ...textAreaDisabled },
      { ...textAreaInsideFieldset },
      { ...textAreaInsideFieldsetDisabled },
      { ...textAreaInsideLegendInsideFieldsetDisabled },
      { ...textAreaDeepInsideLegendInsideFieldsetDisabled },
      { ...textAreaInsideLegendHiddenInsideFieldset },
      { ...textAreaInsideLegendVisibilityHiddenInsideFieldset },
      { ...textAreaInsideLegendDisplayNoneInsideFieldset },
      //endregion
      //region audio
      { ...audio },
      { ...audioWithoutControls },
      //endregion
      //region video
      { ...video },
      { ...videoWithoutControls },
      //endregion
      //region contentEditable
      { ...contentEditableEmpty },
      { ...contentEditableTrue },
      //endregion
    ];

  const focusableCasesHtml = simpleFocusCases
    .filter((focusCase) => focusCase.focus)
    .map((focusableCase) => focusableCase.html);

  const focusableHtml = focusableCasesHtml.join('\r\n');

  const visibilityHiddenHtml = simpleFocusCases
    .filter(
      (focusCase) =>
        !focusCase.focus && focusCase.details === Details.VisibilityHidden
    )
    .map((focusableCase) =>
      focusableCase.html.replace(/\s*data-testid="test-element"\s*/, '')
    )
    .join('\r\n');

  const visibilityVisibleCasesHtml = simpleFocusCases
    .filter((focusCase) => focusCase.focus)
    .map((focusableCase) => {
      if (focusableCase.html.includes('<img')) {
        return focusableCase.html.replace(
          // For AREA, set the corresponding IMG to visible.
          '<img',
          '<img style="visibility: visible"'
        );
      }
      return focusableCase.html.replace(
        /data-testid="test-element"/,
        'style="visibility: visible" data-testid="test-element"'
      );
    });

  //region nested focus cases
  const insideDiv = (html: string) => ({
    html: `<div>${html}</div>`,
    focus: true,
  });
  const insideDivHidden = {
    html: `<div hidden>
          ${focusableHtml}
        </div>`,
    focus: false,
  };
  const insideDivVisibilityHidden = {
    html: `<div style="visibility: hidden">
          ${focusableHtml}
        </div>`,
    focus: false,
  };
  const insideDivDisplayNone = {
    html: `<div style="display: none">
          ${focusableHtml}
        </div>`,
    focus: false,
  };
  const visibilityHiddenInsideDivVisibilityHidden = {
    html: `<div style="visibility: hidden">
          ${visibilityHiddenHtml}
        </div>`,
    focus: false,
  };
  const visibilityHiddenInsideDivVisibilityVisible = {
    html: `<div style="visibility: visible">
          ${visibilityHiddenHtml}
        </div>`,
    focus: false,
  };
  const visibilityVisibleInsideDivVisibilityHidden = (html: string) => ({
    html: `<div style="visibility: hidden">${html}</div>`,
    focus: true,
  });
  const insideDivVisibilityVisibleInsideDivVisibilityHidden = (
    html: string
  ) => ({
    html: `<div style="visibility: hidden">
          <div style="visibility: visible">${html}</div>
        </div>`,
    focus: true,
  });
  //endregion

  const focusCases: { html: string; focus: boolean }[] = [
    ...simpleFocusCases,
    //region nested elements
    ...focusableCasesHtml.map((html) => insideDiv(html)),
    { ...insideDivHidden },
    { ...insideDivVisibilityHidden },
    { ...insideDivDisplayNone },
    { ...visibilityHiddenInsideDivVisibilityHidden },
    { ...visibilityHiddenInsideDivVisibilityVisible },
    ...visibilityVisibleCasesHtml.map((html) =>
      visibilityVisibleInsideDivVisibilityHidden(html)
    ),
    ...focusableCasesHtml.map((html) =>
      insideDivVisibilityVisibleInsideDivVisibilityHidden(html)
    ),
    //endregion
  ];

  it.each(focusCases)(
    'should set focus correctly $#: $html',
    async ({ html, focus }) => {
      document.body.innerHTML = `
    <div>
      <a href="#" data-testid="before-1">Outside trap</a>
      <div data-testid="focus-trap-container">
        ${html}
        <a href="#" data-testid="focus-trap-1">Focus 1</a>
      </div>
    </div>
    `;
      const focusElement = screen.getByTestId(
        focus ? 'test-element' : 'focus-trap-1'
      );
      const lastFocusElement = screen.getByRole('link', { name: 'Focus 1' });
      const focusTrap = new Focusable(
        screen.getByTestId('focus-trap-container')
      );
      expect(focusTrap.isFirstFocusable(focusElement)).toBeTruthy();
      expect(focusTrap.isLastFocusable(lastFocusElement)).toBeTruthy();
    }
  );

  it('should not modify the default config', () => {
    const modifiedConfig = Focusable.defaultConfig;
    modifiedConfig.focusableElementSelectors = 'X';
    expect(modifiedConfig).not.toEqual(Focusable.defaultConfig);
  });
});
