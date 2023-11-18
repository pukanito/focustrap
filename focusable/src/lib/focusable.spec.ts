import { Focusable } from './focusable';
import { screen } from '@testing-library/dom';

describe('Focusable', () => {
  //region anchor
  const anchor = {
    html: `<a href="#" data-testid="test-element">Focus</a>`,
    focus: true,
  };
  const anchorHidden = {
    html: `<a href="#" hidden data-testid="test-element">'hidden' should not get focus</a>`,
    focus: false,
  };
  const anchorVisibilityHidden = {
    html: `<a href="#" style="visibility: hidden" data-testid="test-element">'visibility: hidden' should not get focus</a>`,
    focus: false,
  };
  const anchorDisplayNone = {
    html: `<a href="#" style="display: none" data-testid="test-element">'display: none' should not get focus</a>`,
    focus: false,
  };
  const anchorWithoutHref = {
    html: `<a data-testid="test-element">'a' without href should not get focus</a>`,
    focus: false,
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
  };
  const areaHidden = {
    html: `<img src="#" alt="Test" usemap="#workMap" width="400" height="379">
            <map name="workMap">
              <area shape="rect" coords="34,44,270,350" alt="Computer">
              <area shape="rect" coords="290,172,333,250" alt="Phone" href="#" data-testid="test-element" hidden>
              <area shape="circle" coords="337,300,44" alt="Cup of coffee" href="#">
            </map>`,
    focus: true,
  };
  const areaVisibilityHidden = {
    html: `<img src="#" alt="Test" usemap="#workMap" width="400" height="379">
            <map name="workMap">
              <area shape="rect" coords="34,44,270,350" alt="Computer">
              <area shape="rect" coords="290,172,333,250" alt="Phone" href="#" data-testid="test-element" style="visibility: hidden">
              <area shape="circle" coords="337,300,44" alt="Cup of coffee" href="#">
            </map>`,
    focus: true,
  };
  const areaDisplayNone = {
    html: `<img src="#" alt="Test" usemap="#workMap" width="400" height="379">
            <map name="workMap">
              <area shape="rect" coords="34,44,270,350" alt="Computer">
              <area shape="rect" coords="290,172,333,250" alt="Phone" href="#" data-testid="test-element" style="display: none">
              <area shape="circle" coords="337,300,44" alt="Cup of coffee" href="#">
            </map>`,
    focus: true,
  };
  const areaWithoutHref = {
    html: `<img src="#" alt="Test" usemap="#workMap" width="400" height="379">
            <map name="workMap">
              <area shape="rect" coords="34,44,270,350" alt="Computer">
              <area shape="rect" coords="290,172,333,250" alt="Phone">
              <area shape="circle" coords="337,300,44" alt="Cup of coffee">
            </map>`,
    focus: false,
  };
  const areaWithImgHidden = {
    html: `<img src="#" alt="Test" usemap="#workMap" width="400" height="379" hidden>
            <map name="workMap">
              <area shape="rect" coords="34,44,270,350" alt="Computer">
              <area shape="rect" coords="290,172,333,250" alt="Phone" href="#" data-testid="test-element">
              <area shape="circle" coords="337,300,44" alt="Cup of coffee" href="#">
            </map>`,
    focus: false,
  };
  const areaWithImgVisibilityHidden = {
    html: `<img src="#" alt="Test" usemap="#workMap" width="400" height="379" style="visibility: hidden">
            <map name="workMap">
              <area shape="rect" coords="34,44,270,350" alt="Computer">
              <area shape="rect" coords="290,172,333,250" alt="Phone" href="#" data-testid="test-element">
              <area shape="circle" coords="337,300,44" alt="Cup of coffee" href="#">
            </map>`,
    focus: false,
  };
  const areaWithImgDisplayNone = {
    html: `<img src="#" alt="Test" usemap="#workMap" width="400" height="379" style="display: none">
            <map name="workMap">
              <area shape="rect" coords="34,44,270,350" alt="Computer">
              <area shape="rect" coords="290,172,333,250" alt="Phone" href="#" data-testid="test-element">
              <area shape="circle" coords="337,300,44" alt="Cup of coffee" href="#">
            </map>`,
    focus: false,
  };
  const imgWithoutUsemap = {
    html: `<img src="#" alt="img without usemap attribute should not get focus" data-testid="test-element"/>`,
    focus: false,
  };
  //endregion
  //region button
  const button = {
    html: `<button data-testid="test-element">Focus</button>`,
    focus: true,
  };
  const buttonHidden = {
    html: `<button hidden data-testid="test-element">Hidden button should not get focus</button>`,
    focus: false,
  };
  const buttonVisibilityHidden = {
    html: `<button style="visibility: hidden" data-testid="test-element">Hidden button should not get focus</button>`,
    focus: false,
  };
  const buttonDisplayNone = {
    html: `<button style="display: none" data-testid="test-element">Hidden button should not get focus</button>`,
    focus: false,
  };
  const buttonDisabled = {
    html: `<button disabled data-testid="test-element">Disabled button should not get focus</button>`,
    focus: false,
  };
  const buttonInsideFieldset = {
    html: `<fieldset>
              <button data-testid="test-element">Focus</button>
            </fieldset>`,
    focus: true,
  };
  const buttonInsideFieldsetDisabled = {
    html: `<fieldset disabled>
              <button data-testid="test-element">No focus</button>
            </fieldset>`,
    focus: false,
  };
  const buttonInsideLegendInsideFieldsetDisabled = {
    html: `<fieldset disabled>
              <legend>
                <button data-testid="test-element">Focus</button>
              </legend>
            </fieldset>`,
    focus: true,
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
  };
  const buttonInsideLegendHiddenInsideFieldset = {
    html: `<fieldset>
              <legend hidden>
                <button data-testid="test-element">No focus</button>
              </legend>
            </fieldset>`,
    focus: false,
  };
  const buttonInsideLegendVisibilityHiddenInsideFieldset = {
    html: `<fieldset>
              <legend style="visibility:hidden;">
                <button data-testid="test-element">No focus</button>
              </legend>
            </fieldset>`,
    focus: false,
  };
  const buttonInsideLegendDisplayNoneInsideFieldset = {
    html: `<fieldset>
              <legend style="display:none">
                <button data-testid="test-element">No focus</button>
              </legend>
            </fieldset>`,
    focus: false,
  };
  //endregion
  //region details/summary
  const summary = {
    html: `<details>
              <summary data-testid="test-element">Test</summary>
              <p>Test description.</p>
            </details>`,
    focus: true,
  };
  const detailsWithoutSummary = {
    html: `<details data-testid="test-element">
              <p>Test description.</p>
            </details>`,
    focus: true,
  };
  const detailsWithSummaryHidden = {
    html: `<details data-testid="test-element">
              <summary hidden>Test</summary>
              <p>Test description.</p>
            </details>`,
    focus: false,
  };
  const hiddenDetailsWithSummary = {
    html: `<details hidden>
              <summary data-testid="test-element">Test</summary>
              <p>Test description.</p>
            </details>`,
    focus: false,
  };
  const hiddenDetailsWithoutSummary = {
    html: `<details data-testid="test-element" hidden>
              <p>Test description.</p>
            </details>`,
    focus: false,
  };
  //endregion
  //region input
  const input = {
    html: `<input type="text" aria-label="input should get focus" data-testid="test-element">`,
    focus: true,
  };
  const inputTypeHidden = {
    html: `<input type="hidden" aria-label="'type=hidden' input should not get focus" data-testid="test-element">`,
    focus: false,
  };
  const inputHidden = {
    html: `<input type="text" hidden aria-label="hidden input should not get focus" data-testid="test-element">`,
    focus: false,
  };
  const inputVisibilityHidden = {
    html: `<input type="text" style="visibility: hidden" aria-label="visibility hidden input should not get focus" data-testid="test-element">`,
    focus: false,
  };
  const inputDisplayNone = {
    html: `<input type="text" style="display: none" aria-label="display none input should not get focus" data-testid="test-element">`,
    focus: false,
  };
  const inputDisabled = {
    html: `<input type="text" disabled aria-label="disabled input should not get focus" data-testid="test-element">`,
    focus: false,
  };
  const inputInsideFieldset = {
    html: `<fieldset>
              <input type="text" aria-label="input should get focus" data-testid="test-element">
            </fieldset>`,
    focus: true,
  };
  const inputInsideFieldsetDisabled = {
    html: `<fieldset disabled>
              <input type="text" aria-label="input should not get focus" data-testid="test-element">
            </fieldset>`,
    focus: false,
  };
  const inputInsideLegendInsideFieldsetDisabled = {
    html: `<fieldset disabled>
              <legend>
                <input type="text" aria-label="input should get focus" data-testid="test-element">
              </legend>
            </fieldset>`,
    focus: true,
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
  };
  const inputInsideLegendHiddenInsideFieldset = {
    html: `<fieldset>
              <legend hidden>
                <input type="text" aria-label="input should not get focus" data-testid="test-element">
              </legend>
            </fieldset>`,
    focus: false,
  };
  const inputInsideLegendVisibilityHiddenInsideFieldset = {
    html: `<fieldset>
              <legend style="visibility:hidden;">
                <input type="text" aria-label="input should not get focus" data-testid="test-element">
              </legend>
            </fieldset>`,
    focus: false,
  };
  const inputInsideLegendDisplayNoneInsideFieldset = {
    html: `<fieldset>
              <legend style="display:none">
                <input type="text" aria-label="input should not get focus" data-testid="test-element">
              </legend>
            </fieldset>`,
    focus: false,
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
  };
  const selectHidden = {
    html: `<label for="selecttest">Choose an item:</label>
           <select hidden name="selecttest" id="selecttest" data-testid="test-element">
             <option value="item1">Item 1</option>
             <option value="item2">Item 2</option>
           </select>`,
    focus: false,
  };
  const selectVisibilityHidden = {
    html: `<label for="selecttest">Choose an item:</label>
           <select style="visibility: hidden" name="selecttest" id="selecttest" data-testid="test-element">
             <option value="item1">Item 1</option>
             <option value="item2">Item 2</option>
           </select>`,
    focus: false,
  };
  const selectDisplayNone = {
    html: `<label for="selecttest">Choose an item:</label>
           <select style="display: none" name="selecttest" id="selecttest" data-testid="test-element">
             <option value="item1">Item 1</option>
             <option value="item2">Item 2</option>
           </select>`,
    focus: false,
  };
  const selectDisabled = {
    html: `<label for="selecttest">Choose an item:</label>
           <select disabled name="selecttest" id="selecttest" data-testid="test-element">
             <option value="item1">Item 1</option>
             <option value="item2">Item 2</option>
           </select>`,
    focus: false,
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
  };
  const selectInsideFieldsetDisabled = {
    html: `<fieldset disabled>
              <label for="selecttest">Choose an item:</label>
              <select name="selecttest" id="selecttest" data-testid="test-element">
                <option value="item1">Item 1</option>
                <option value="item2">Item 2</option>
              </select>
            </fieldset>`,
    focus: false,
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
  };
  const selectInsideLegendHiddenInsideFieldset = {
    html: `<fieldset>
              <legend hidden>
                <label for="selecttest">Choose an item:</label>
                <select name="selecttest" id="selecttest" data-testid="test-element">
                  <option value="item1">Item 1</option>
                  <option value="item2">Item 2</option>
                </select>
              </legend>
            </fieldset>`,
    focus: false,
  };
  const selectInsideLegendVisibilityHiddenInsideFieldset = {
    html: `<fieldset>
              <legend style="visibility:hidden;">
                <label for="selecttest">Choose an item:</label>
                <select name="selecttest" id="selecttest" data-testid="test-element">
                  <option value="item1">Item 1</option>
                  <option value="item2">Item 2</option>
                </select>
              </legend>
            </fieldset>`,
    focus: false,
  };
  const selectInsideLegendDisplayNoneInsideFieldset = {
    html: `<fieldset>
              <legend style="display:none">
                <label for="selecttest">Choose an item:</label>
                <select name="selecttest" id="selecttest" data-testid="test-element">
                  <option value="item1">Item 1</option>
                  <option value="item2">Item 2</option>
                </select>
              </legend>
            </fieldset>`,
    focus: false,
  };
  //endregion
  //region textArea
  const textArea = {
    html: `<label for="textarea">Textarea:</label>
           <textarea id="textarea" name="textarea1" rows="4" cols="50" data-testid="test-element">
           Focus.
           </textarea>`,
    focus: true,
  };
  const textAreaHidden = {
    html: `<label for="textarea">Textarea:</label>
           <textarea hidden id="textarea" name="textarea1" rows="4" cols="50" data-testid="test-element">
           No focus.
           </textarea>`,
    focus: false,
  };
  const textAreaVisibilityHidden = {
    html: `<label for="textarea">Textarea:</label>
           <textarea style="visibility: hidden" id="textarea" name="textarea1" rows="4" cols="50" data-testid="test-element">
           No focus.
           </textarea>`,
    focus: false,
  };
  const textAreaDisplayNone = {
    html: `<label for="textarea">Textarea:</label>
           <textarea style="display: none" id="textarea" name="textarea1" rows="4" cols="50" data-testid="test-element">
           No focus.
           </textarea>`,
    focus: false,
  };
  const textAreaDisabled = {
    html: `<label for="textarea">Textarea:</label>
           <textarea disabled id="textarea" name="textarea1" rows="4" cols="50" data-testid="test-element">
           No focus.
           </textarea>`,
    focus: false,
  };
  const textAreaInsideFieldset = {
    html: `<fieldset>
              <label for="textarea">Textarea:</label>
              <textarea id="textarea" name="textarea1" rows="4" cols="50" data-testid="test-element">
              Focus.
              </textarea>
            </fieldset>`,
    focus: true,
  };
  const textAreaInsideFieldsetDisabled = {
    html: `<fieldset disabled>
              <label for="textarea">Textarea:</label>
              <textarea disabled id="textarea" name="textarea1" rows="4" cols="50" data-testid="test-element">
              No focus.
              </textarea>
            </fieldset>`,
    focus: false,
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
  };
  const textAreaInsideLegendHiddenInsideFieldset = {
    html: `<fieldset>
              <legend hidden>
                <label for="textarea">Textarea:</label>
                <textarea id="textarea" name="textarea1" rows="4" cols="50" data-testid="test-element">
                No focus.
                </textarea>
              </legend>
            </fieldset>`,
    focus: false,
  };
  const textAreaInsideLegendVisibilityHiddenInsideFieldset = {
    html: `<fieldset>
              <legend style="visibility:hidden;">
                <label for="textarea">Textarea:</label>
                <textarea id="textarea" name="textarea1" rows="4" cols="50" data-testid="test-element">
                No focus.
                </textarea>
              </legend>
            </fieldset>`,
    focus: false,
  };
  const textAreaInsideLegendDisplayNoneInsideFieldset = {
    html: `<fieldset>
              <legend style="display:none">
                <label for="textarea">Textarea:</label>
                <textarea id="textarea" name="textarea1" rows="4" cols="50" data-testid="test-element">
                No focus.
                </textarea>
              </legend>
            </fieldset>`,
    focus: false,
  };
  //endregion
  //region audio
  const audio = {
    html: `<audio controls data-testid="test-element"><source src="#" type="audio/mpeg">'audio' with controls attribute should get focus</audio>`,
    focus: true,
  };
  const audioWithoutControls = {
    html: `<audio>'audio' without controls attribute should not get focus</audio>`,
    focus: false,
  };
  //endregion
  //region video
  const video = {
    html: `<video controls data-testid="test-element"><source src="#" type="video/mp4">'video' with controls attribute should get focus</video>`,
    focus: true,
  };
  const videoWithoutControls = {
    html: `<video>'video' without controls attribute should not get focus</video>`,
    focus: false,
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
  };
  const contentEditableTrue = {
    html: `<div>
         <cite contenteditable="true" data-testid="test-element">should get focus on cite</cite>
        </div>`,
    focus: true,
  };
  //endregion
  //region nested elements
  const insideDivHidden = {
    html: `<div hidden>
          <a href="#" data-testid="test-element">inside 'visibility: hidden' should not get focus</a>
        </div>`,
    focus: false,
  };
  const insideDivVisibilityHidden = {
    html: `<div style="visibility: hidden">
          <a href="#" data-testid="test-element">inside 'visibility: hidden' should not get focus</a>
        </div>`,
    focus: false,
  };
  const insideDivDisplayNone = {
    html: `<div style="display: none">
          <a href="#" data-testid="test-element">inside 'display: none' should not get focus</a>
        </div>`,
    focus: false,
  };
  const visibilityHiddenInsideDivVisibilityHidden = {
    html: `<div style="visibility: hidden">
          <a href="#" data-testid="test-element" style="visibility: hidden">inside 'visibility: hidden' and self 'visibility: hidden' should not get focus</a>
        </div>`,
    focus: false,
  };
  const visibilityHiddenInsideDivVisibilityVisible = {
    html: `<div style="visibility: visible">
          <a href="#" data-testid="test-element" style="visibility: hidden">self 'visibility: hidden' should not get focus</a>
        </div>`,
    focus: false,
  };
  const visibilityVisibleInsideDivVisibilityHidden = {
    html: `<div style="visibility: hidden">
          <a href="#" style="visibility: visible" data-testid="test-element">Focus</a>
        </div>`,
    focus: true,
  };
  const insideDivVisibilityVisibleInsideDivVisibilityHidden = {
    html: `<div style="visibility: hidden">
          <div style="visibility: visible">
            <a href="#" data-testid="test-element">Focus</a>
          </div>
        </div>`,
    focus: true,
  };
  //endregion

  const setInitialFocusCases: { html: string; focus: boolean }[] = [
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
    //region nested elements
    { ...insideDivHidden },
    { ...insideDivVisibilityHidden },
    { ...insideDivDisplayNone },
    { ...visibilityHiddenInsideDivVisibilityHidden },
    { ...visibilityHiddenInsideDivVisibilityVisible },
    { ...visibilityVisibleInsideDivVisibilityHidden },
    { ...insideDivVisibilityVisibleInsideDivVisibilityHidden },
    //endregion
  ];

  it.each(setInitialFocusCases)(
    'should set focus correctly $#',
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
