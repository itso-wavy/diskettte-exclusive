import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

const Post = ({ post }) => {
  return (
    <div className='rounded-xl border'>
      <Link to='/writer/postId'>
        <img src='' alt='profile' />
        <div>
          <p>writer</p>
          <p>created</p>
        </div>
        <div>content</div>
        <div>
          <button>comments</button>
          <button>repost</button>
          <button>like</button>
          <button>bookmark</button>
          <button>...</button>
        </div>
      </Link>
    </div>
  );
};

export default Post;
{
  /* <div role="gridcell" style="top: 0px; left: 624px; width: 288px; writing-mode: horizontal-tb; position: absolute;">
  <div style="" class="Explore_exploreCard__5xca5">

      <div style="opacity: 1;">
        <div class="ProfilePhoto_profilePhoto___1qmp" data-size="x-small" style="width: 36px; height: 36px; margin: 0px;">
        <img draggable="false" alt="Stacey Donaldson" src="https://res.cloudinary.com/read-cv/image/upload/c_fill,h_36,w_36/dpr_1.0/v1/1/profilePhotos/0imRHQxwXdQHHzPMBiqAqgreFqf1/0f545286-1230-42f1-87e1-98d9867f68e6.jpg?_a=DATAdtAAZAA0" srcset="https://res.cloudinary.com/read-cv/image/upload/c_fill,h_36,w_36/dpr_1.0/v1/1/profilePhotos/0imRHQxwXdQHHzPMBiqAqgreFqf1/0f545286-1230-42f1-87e1-98d9867f68e6.jpg?_a=DATAdtAAZAA0 1x, https://res.cloudinary.com/read-cv/image/upload/c_fill,h_36,w_36/dpr_2.0/v1/1/profilePhotos/0imRHQxwXdQHHzPMBiqAqgreFqf1/0f545286-1230-42f1-87e1-98d9867f68e6.jpg?_a=DATAdtAAZAA0 2x, https://res.cloudinary.com/read-cv/image/upload/c_fill,h_36,w_36/dpr_3.0/v1/1/profilePhotos/0imRHQxwXdQHHzPMBiqAqgreFqf1/0f545286-1230-42f1-87e1-98d9867f68e6.jpg?_a=DATAdtAAZAA0 3x" style="opacity: 1;"></div>
      </div>
    </a>
    <div class="Explore_thumbnail__C2zsu Explore_image__VqPSq" style="padding-bottom: 56.25%;">
    <a class="MegaLink_megalink__u_TFB" href="https://www.onedesigncompany.com/news/featured-project-confluence-chicago-2" target="_blank" rel="noopener noreferrer" data-hover="false">
    <img src="https://res.cloudinary.com/read-cv/image/upload/c_limit,h_512,w_512/v1/1/profileItems/0imRHQxwXdQHHzPMBiqAqgreFqf1/newProfileItem/d631252e-7d23-484e-b6dc-957efe0da9a4.png?_a=DATAdtAAZAA0">
    </a></div>
    <div class="Explore_story__W3YjY"><span class="Explore_author__nk7KF"><a class="MegaLink_megalink__u_TFB" data-hover="true" href="/staceydnldsn">Stacey Donaldson</a></span>
      <div class="ProfileItem_title__rsz3J">
        <div><a class="MegaLink_megalink__u_TFB ProfileItem_titleLink__qXU7l" href="https://www.onedesigncompany.com/news/featured-project-confluence-chicago-2" target="_blank" rel="noopener noreferrer" data-hover="true">Brand identity for Confluence Chicago<span> at One Design Co.</span></a><span style="white-space: nowrap;">﻿<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.5 3C3.22386 3 3 3.22386 3 3.5C3 3.77614 3.22386 4 3.5 4V3ZM8.5 3.5H9C9 3.22386 8.77614 3 8.5 3V3.5ZM8 8.5C8 8.77614 8.22386 9 8.5 9C8.77614 9 9 8.77614 9 8.5H8ZM2.64645 8.64645C2.45118 8.84171 2.45118 9.15829 2.64645 9.35355C2.84171 9.54882 3.15829 9.54882 3.35355 9.35355L2.64645 8.64645ZM3.5 4H8.5V3H3.5V4ZM8 3.5V8.5H9V3.5H8ZM8.14645 3.14645L2.64645 8.64645L3.35355 9.35355L8.85355 3.85355L8.14645 3.14645Z" fill="#111"></path>
            </svg></span></div>
      </div>
      <div class="ProfileItem_collaborators__aSb2p">
        <div class="Tooltip_tooltipWrap__GQF8C"><a class="MegaLink_megalink__u_TFB" data-hover="false" href="/nickrissmeyer">
            <div>
              <div class="ProfilePhoto_profilePhoto___1qmp" data-size="x-small" style="width: 24px; height: 24px; margin: 0px;"><img draggable="false" alt="Nick Rissmeyer" src="https://res.cloudinary.com/read-cv/image/upload/c_fill,h_24,w_24/dpr_1.0/v1/1/profilePhotos/ZWSWAazQmEgQR3gxm45pH52XPo13/854e891b-d745-4fa2-997f-31bbd128d1b7.jpg?_a=DATAdtAAZAA0" srcset="https://res.cloudinary.com/read-cv/image/upload/c_fill,h_24,w_24/dpr_1.0/v1/1/profilePhotos/ZWSWAazQmEgQR3gxm45pH52XPo13/854e891b-d745-4fa2-997f-31bbd128d1b7.jpg?_a=DATAdtAAZAA0 1x, https://res.cloudinary.com/read-cv/image/upload/c_fill,h_24,w_24/dpr_2.0/v1/1/profilePhotos/ZWSWAazQmEgQR3gxm45pH52XPo13/854e891b-d745-4fa2-997f-31bbd128d1b7.jpg?_a=DATAdtAAZAA0 2x, https://res.cloudinary.com/read-cv/image/upload/c_fill,h_24,w_24/dpr_3.0/v1/1/profilePhotos/ZWSWAazQmEgQR3gxm45pH52XPo13/854e891b-d745-4fa2-997f-31bbd128d1b7.jpg?_a=DATAdtAAZAA0 3x" style="opacity: 1;"></div>
            </div>
          </a></div>
      </div>
    </div>
    <ul class="Explore_highlightTags__6Dwoo">
      <li>#projects</li>
    </ul>
    <div style="display: flex; align-items: center;">
      <div class="Explore_replyComposerContainer__N8nTA" data-admin="false" style="flex: 1 1 0%;">
        <div class="ReplyComposer_replyComposer__z4IR8 ReplyComposer_noPadding___6OkD">
          <div class="ReplyComposer_replyInput__caghw" style="width: calc(100% - 46px);">
            <div class="TextInput_input__Oo6rP" data-style="messageBubble" data-context="Highlights">
              <div class="TextInput_inputWrap__QwmxR" data-style="messageBubble" data-error="false"><input autocomplete="chrome-off" type="text" spellcheck="false" placeholder="Reply directly..." data-lowercase="false" readonly="" value=""></div>
            </div>
            <div class="ReplyComposer_repliesEmojiPicker__e28LJ">
              <div class="Popover_popoverWrap__ju5cY"><button class="Button_button__AQ1KL" data-style="light" data-loading="false">
                  <div class="Button_icon___WOGE" style="margin: 0px auto;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M13.6094 9.77581C13.6094 9.04216 14.1319 8.49902 14.7165 8.49902C15.3011 8.49902 15.8237 9.04216 15.8237 9.77581C15.8237 10.5095 15.3011 11.0526 14.7165 11.0526C14.1319 11.0526 13.6094 10.5095 13.6094 9.77581Z" fill="#999"></path>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M8.17969 9.77581C8.17969 9.04216 8.70224 8.49902 9.28683 8.49902C9.87142 8.49902 10.394 9.04216 10.394 9.77581C10.394 10.5095 9.87142 11.0526 9.28683 11.0526C8.70224 11.0526 8.17969 10.5095 8.17969 9.77581Z" fill="#999"></path>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M8.11029 13.8779C8.40319 13.585 8.87806 13.585 9.17096 13.8779C9.89563 14.6026 10.8946 15.0494 11.9994 15.0494C13.1042 15.0494 14.1031 14.6026 14.8278 13.8779C15.1207 13.585 15.5956 13.585 15.8885 13.8779C16.1814 14.1708 16.1814 14.6456 15.8885 14.9385C14.894 15.933 13.518 16.5494 11.9994 16.5494C10.4808 16.5494 9.10478 15.933 8.1103 14.9385C7.8174 14.6456 7.8174 14.1708 8.11029 13.8779Z" fill="#999"></path>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M12 19.5C16.1421 19.5 19.5 16.1421 19.5 12C19.5 7.85786 16.1421 4.5 12 4.5C7.85786 4.5 4.5 7.85786 4.5 12C4.5 16.1421 7.85786 19.5 12 19.5ZM12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" fill="#999"></path>
                    </svg></div>
                </button></div>
            </div>
            <div class="ReplyComposer_sendButton__RUhz3" style="pointer-events: none; opacity: 0; transform: scale(0) translateZ(0px);"><button class="Button_button__AQ1KL" data-style="light" data-loading="false">
                <div class="Button_icon___WOGE" style="margin: 0px auto;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.4326 20.9902C14.0479 20.9902 14.4873 20.4717 14.7949 19.6807L20.2529 5.40723C20.4023 5.0293 20.4814 4.69531 20.4814 4.41406C20.4814 3.85156 20.1387 3.5 19.5762 3.5C19.2949 3.5 18.9609 3.58789 18.583 3.7373L4.23926 9.23047C3.53613 9.49414 3 9.93359 3 10.5488C3 11.3223 3.58887 11.5947 4.38867 11.8408L8.81836 13.1855C9.36328 13.3525 9.6709 13.3438 10.0488 12.9922L19.2158 4.44922C19.3301 4.35254 19.4531 4.36133 19.541 4.44922C19.6289 4.52832 19.6377 4.66016 19.541 4.77441L11.0244 13.9678C10.6904 14.3193 10.6641 14.6357 10.8311 15.1982L12.1318 19.5312C12.3867 20.3662 12.6592 20.9902 13.4326 20.9902Z" fill="#999"></path>
                  </svg></div>
              </button></div>
          </div>
          <div class="ReplyComposer_reactions__56c2N" style="pointer-events: all; opacity: 1; transform: translateX(1px) scale(1) translateZ(0px);"><button class="Button_button__AQ1KL Reaction_reaction__URsIr" data-style="light" data-loading="false">
              <div class="Reaction_reactionEmoji__b1lja">🔥</div>
            </button></div>
        </div>
      </div>
    </div>
  </div>
</div> */
}
