<template>
  <div class="fit row no-wrap justify-start items-start content-start">
    <q-page>
      <div class="activity-pane">
        <div
          class="row items-center justify-center activity-selector-icon-holder"
        >
          <q-icon name="mdi-folder-outline" class="activity-selector-icon" />
        </div>
        <div
          class="row items-center justify-center activity-selector-icon-holder"
        >
          <q-icon name="mdi-magnify" class="activity-selector-icon" />
        </div>
        <div
          class="row items-center justify-center activity-selector-icon-holder"
        >
          <q-icon name="mdi-publish" class="activity-selector-icon" />
        </div>
        <div
          class="row items-center justify-center activity-selector-icon-holder"
        >
          <q-icon name="mdi-cog" class="activity-selector-icon" />
        </div>
      </div>
    </q-page>
    <div class="col" style="display: inline-block;">
      <q-splitter v-model="splitterModel">
        <template v-slot:before>
          <q-page>
            <div
              class="q-pa-sm"
              style="
                height: 10px;
                min-height: inherit;
                border: 1px solid red;
                overflow: auto;
              "
              visible
            >
              <div @contextmenu="showNodeSelected">TEST</div>
              <div class="q-pa-md">
                <button v-on:click="showNodeSelected">showClickedNode</button>
                <div class="tree-wrapper">
                  <q-tree
                    :nodes="customize"
                    :duration="100"
                    node-key="label"
                    default-expand-all
                    ref="mytree"
                  >
                    <template v-slot:header-generic="prop">
                      <div
                        class="row items-center no-wrap"
                        :id="prop.node.myid"
                        @contextmenu="miketest"
                        @click="mikeclick"
                        @doubleclick="mikedouble"
                      >
                        <q-icon
                          :name="prop.node.icon || 'star'"
                          :color="prop.node.iconcolor || 'orange'"
                          class="icon-common"
                        />
                        <div class="node-common">{{ prop.node.label }}</div>
                      </div>
                    </template>

                    <template v-slot:default-header="prop">
                      <div class="node-common">{{ prop.node.label }}</div>
                    </template>

                    <template v-slot:body-story="prop">
                      <span
                        class="row items-center"
                        :id="prop.node.myid"
                        @contextmenu="miketest"
                        >The story is: {{ prop.node.story }}</span
                      >
                    </template>
                  </q-tree>
                </div>
              </div>
            </div>
          </q-page>
        </template>

        <template v-slot:after>
          <q-page style="background-color: white;">
            <q-splitter
              v-model="splitterModel2"
              :limits="[0, Infinity]"
              :horizontal="splitterOrientation"
              style="height: 10px; min-height: inherit;"
            >
              <template v-slot:before>
                <div class="q-pa-md">
                  <div class="text-h4 q-mb-md">Before</div>
                  <button v-on:click="addStyle">Add Style</button>
                  <button v-on:click="removeStyle">Remove Style</button>
                  <div>
                    <div style="display:inline-block;vertical-align:top;">
                      <q-img
                        src="/statics/TreeSectionCallouts-sm2.png"
                        style="width: 300px; height: 150px;"
                      />
                    </div>
                    <div class="col" style="display:inline-block;border:1px solid red;vertical-align:top;margin-left:18px;">
                      <p>This is text</p>
                      <p>This is more text</p>
                    </div>
                  </div>
                  <div class="row">
                    
                    <q-stepper
                      v-model="step"
                      header-nav
                      ref="stepper"
                      color="primary"
                      animated
                      style="margin-top:18px;"
                    >
                      <q-step
                        :name="1"
                        title="Arrow"
                        icon="img:/statics/callout1off.png"
                        active-icon="img:/statics/callout1.png"
                        done-color="ff7d06"
                        active-color="ff7d06"
                        :done="done1"
                      >
                        <div class="row">
                          <div class="col">
                            <div>Arrow Color</div>
                            <q-input
                              filled
                              v-model="arrowColor"
                              class="my-input"
                              dense
                              @change="setArrowColorFromText"
                            >
                              <template v-slot:append>
                                <q-icon name="colorize" class="cursor-pointer">
                                  <q-popup-proxy
                                    transition-show="scale"
                                    transition-hide="scale"
                                  >
                                    <q-color
                                      v-model="arrowColor"
                                      @change="
                                        (val) => {
                                          setArrowColor(val)
                                        }
                                      "
                                    />
                                  </q-popup-proxy>
                                </q-icon>
                              </template>
                            </q-input>
                          </div>
                          <div class="col">
                            <div class="tree-param">
                              <div>Arrow Size ({{ arrowSize }}px)</div>
                              <q-slider
                                v-model="arrowSize"
                                :min="1"
                                :max="50"
                                @input="
                                  (val) => {
                                    setArrowSize(val)
                                  }
                                "
                              />
                            </div>
                          </div>
                          <div class="col">
                            <div class="tree-param">
                              <div>Arrow Left Margin ({{ arrowLeftMargin }}px)</div>
                              <q-slider
                                v-model="arrowLeftMargin"
                                :min="-25"
                                :max="25"
                                @input="
                                  (val) => {
                                    setArrowLeftMargin(val)
                                  }
                                "
                              />
                            </div>
                          </div>
                        </div>
                      </q-step>

                      <q-step
                        :name="2"
                        title="Icon"
                        icon="img:/statics/callout2off.png"
                        active-icon="img:/statics/callout2.png"
                        done-color="ff7d06"
                        active-color="ff7d06"
                        :done="done1"
                      >
                        <div class="row">
                          <div class="col">
                            <div class="tree-param">
                              <div>Icon Color</div>
                              <q-input
                                filled
                                v-model="iconColor"
                                class="my-input"
                                dense
                                @change="setIconColorFromText"
                              >
                                <template v-slot:append>
                                  <q-icon
                                    name="colorize"
                                    class="cursor-pointer"
                                  >
                                    <q-popup-proxy
                                      transition-show="scale"
                                      transition-hide="scale"
                                    >
                                      <q-color
                                        v-model="iconColor"
                                        @change="
                                          (val) => {
                                            setIconColor(val)
                                          }
                                        "
                                      />
                                    </q-popup-proxy>
                                  </q-icon>
                                </template>
                              </q-input>
                            </div>
                          </div>
                          <div class="col">
                            <div class="tree-param">
                              <div>Icon Size ({{ iconSize }}px)</div>
                              <q-slider
                                v-model="iconSize"
                                :min="1"
                                :max="50"
                                @input="
                                  (val) => {
                                    setIconSize(val)
                                  }
                                "
                              />
                            </div>
                          </div>
                          <div class="col">
                            <div class="tree-param">
                              <div>
                                Icon Bottom Padding ({{ iconBottomPadding }}px)
                              </div>
                              <q-slider
                                v-model="iconBottomPadding"
                                :min="1"
                                :max="50"
                                @input="
                                  (val) => {
                                    setIconBottomPadding(val)
                                  }
                                "
                              />
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col">
                            <div class="tree-param">
                              <div>
                                Icon Margin Right ({{ iconMarginRight }}px)
                              </div>
                              <q-slider
                                v-model="iconMarginRight"
                                :min="1"
                                :max="50"
                                @input="
                                  (val) => {
                                    setIconMarginRight(val)
                                  }
                                "
                              />
                            </div>
                          </div>
                          <div class="col"></div>
                          <div class="col"></div>
                        </div>
                      </q-step>

                      <q-step
                        :name="3"
                        title="Node"
                        icon="img:/statics/callout3off.png"
                        active-icon="img:/statics/callout3.png"
                        done-color="ff7d06"
                        active-color="ff7d06"
                        :done="done1"
                      >
                        <div class="row">
                          <div class="col">
                            <div class="tree-param">
                              <div>Node Color</div>
                              <q-input
                                filled
                                v-model="nodeColor"
                                class="my-input"
                                dense
                                @change="setNodeColorFromText"
                              >
                                <template v-slot:append>
                                  <q-icon
                                    name="colorize"
                                    class="cursor-pointer"
                                  >
                                    <q-popup-proxy
                                      transition-show="scale"
                                      transition-hide="scale"
                                    >
                                      <q-color
                                        v-model="nodeColor"
                                        @change="
                                          (val) => {
                                            setNodeColor(val)
                                          }
                                        "
                                      />
                                    </q-popup-proxy>
                                  </q-icon>
                                </template>
                              </q-input>
                            </div>
                          </div>
                          <div class="col">
                            <div class="tree-param">
                              <div>Node Font Family</div>
                              <q-select
                                filled
                                v-model="nodeFontModel"
                                :options="options"
                                label="Font Family"
                                color="teal"
                                options-selected-class="text-deep-orange"
                                ref="nodeFontSelector"
                                @input="setNodeFontFamily"
                              >
                                <template v-slot:option="scope">
                                  <q-item
                                    v-bind="scope.itemProps"
                                    v-on="scope.itemEvents"
                                  >
                                    <q-item-section>
                                      <q-item-label
                                        v-html="scope.opt.label"
                                        :style="scope.opt.labelstyle"
                                      />
                                    </q-item-section>
                                  </q-item>
                                </template>
                              </q-select>
                            </div>
                          </div>
                          <div class="col">
                            <div class="tree-param">
                              <div>Node Font Size ({{ nodeFontSize }}px)</div>
                              <q-slider
                                v-model="nodeFontSize"
                                :min="1"
                                :max="50"
                                @input="
                                  (val) => {
                                    setNodeFontSize(val)
                                  }
                                "
                              />
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col">
                            <div class="tree-param">
                              <div>Node Margin Top ({{ nodeMarginTop }}px)</div>
                              <q-slider
                                v-model="nodeMarginTop"
                                :min="1"
                                :max="25"
                                @input="
                                  (val) => {
                                    setNodeMarginTop(val)
                                  }
                                "
                              />
                            </div>
                          </div>
                          <div class="col">
                            <div class="tree-param">
                              <div>Node Padding ({{ nodePadding }}px)</div>
                              <q-slider
                                v-model="nodePadding"
                                :min="1"
                                :max="25"
                                @input="
                                  (val) => {
                                    setNodePadding(val)
                                  }
                                "
                              />
                            </div>
                          </div>
                          <div class="col">
                            <div class="tree-param">
                              <div>Node Font Weight</div>
                              <q-select
                                filled
                                v-model="nodeFontWeightModel"
                                :options="nodeFontWeightOptions"
                                label="Font Weight"
                                color="teal"
                                options-selected-class="text-deep-orange"
                                ref="nodeFontWeightSelector"
                                @input="setNodeFontWeight"
                              >
                                <template v-slot:option="scope">
                                  <q-item
                                    v-bind="scope.itemProps"
                                    v-on="scope.itemEvents"
                                  >
                                    <q-item-section>
                                      <q-item-label
                                        v-html="scope.opt.label"
                                        :style="scope.opt.labelstyle"
                                      />
                                    </q-item-section>
                                  </q-item>
                                </template>
                              </q-select>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col">
                            <div class="tree-param">
                              <div>Node Wrap</div>
                              <q-btn-toggle
                                v-model="nodeWrapModel"
                                class="my-custom-toggle"
                                no-caps
                                rounded
                                unelevated
                                toggle-color="primary"
                                color="white"
                                text-color="primary"
                                :options="[
                                  { label: 'Nowrap', value: 'nowrap' },
                                  { label: 'Wrap', value: 'wrap' },
                                ]"
                                @input="
                                  (val) => {
                                    setNodeWrap(val)
                                  }
                                "
                              />
                            </div>
                          </div>
                          <div class="col"></div>
                          <div class="col"></div>
                        </div>
                      </q-step>

                      <q-step
                        :name="4"
                        title="Story"
                        icon="img:/statics/callout4off.png"
                        active-icon="img:/statics/callout4.png"
                        done-color="ff7d06"
                        active-color="ff7d06"
                        :done="done1"
                      >
                        <q-step
                        :name="4"
                        title="Story"
                        icon="img:/statics/callout4off.png"
                        active-icon="img:/statics/callout4.png"
                        done-color="ff7d06"
                        active-color="ff7d06"
                        :done="done4"
                      >
                        <div class="row">
                          <div class="col">
                            <div class="tree-param">
                              <div>Story Color</div>
                              <q-input
                                filled
                                v-model="storyColor"
                                class="my-input"
                                dense
                                @change="setStoryColorFromText"
                              >
                                <template v-slot:append>
                                  <q-icon
                                    name="colorize"
                                    class="cursor-pointer"
                                  >
                                    <q-popup-proxy
                                      transition-show="scale"
                                      transition-hide="scale"
                                    >
                                      <q-color
                                        v-model="nodeColor"
                                        @change="
                                          (val) => {
                                            setStoryColor(val)
                                          }
                                        "
                                      />
                                    </q-popup-proxy>
                                  </q-icon>
                                </template>
                              </q-input>
                            </div>
                          </div>
                          <div class="col">
                            <div class="tree-param">
                              <div>Story Font Family</div>
                              <q-select
                                filled
                                v-model="storyFontModel"
                                :options="options"
                                label="Font Family"
                                color="teal"
                                options-selected-class="text-deep-orange"
                                ref="storyFontSelector"
                                @input="setStoryFontFamily"
                              >
                                <template v-slot:option="scope">
                                  <q-item
                                    v-bind="scope.itemProps"
                                    v-on="scope.itemEvents"
                                  >
                                    <q-item-section>
                                      <q-item-label
                                        v-html="scope.opt.label"
                                        :style="scope.opt.labelstyle"
                                      />
                                    </q-item-section>
                                  </q-item>
                                </template>
                              </q-select>
                            </div>
                          </div>
                          <div class="col">
                            <div class="tree-param">
                              <div>Story Font Size ({{ storyFontSize }}px)</div>
                              <q-slider
                                v-model="storyFontSize"
                                :min="1"
                                :max="50"
                                @input="
                                  (val) => {
                                    setStoryFontSize(val)
                                  }
                                "
                              />
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col">
                            <div class="tree-param">
                              <div>Story Font Weight</div>
                              <q-select
                                filled
                                v-model="storyFontWeightModel"
                                :options="nodeFontWeightOptions"
                                label="Font Weight"
                                color="teal"
                                options-selected-class="text-deep-orange"
                                ref="storyFontWeightSelector"
                                @input="setStoryFontWeight"
                              >
                                <template v-slot:option="scope">
                                  <q-item
                                    v-bind="scope.itemProps"
                                    v-on="scope.itemEvents"
                                  >
                                    <q-item-section>
                                      <q-item-label
                                        v-html="scope.opt.label"
                                        :style="scope.opt.labelstyle"
                                      />
                                    </q-item-section>
                                  </q-item>
                                </template>
                              </q-select>
                            </div>
                          </div>
                          <div class="col">
                            <div class="tree-param">
                              <div>Story Wrap</div>
                              <q-btn-toggle
                                v-model="storyWrapModel"
                                class="my-custom-toggle"
                                no-caps
                                rounded
                                unelevated
                                toggle-color="primary"
                                color="white"
                                text-color="primary"
                                :options="[
                                  { label: 'Nowrap', value: 'nowrap' },
                                  { label: 'Wrap', value: 'wrap' },
                                ]"
                                @input="
                                  (val) => {
                                    setStoryWrap(val)
                                  }
                                "
                              />
                            </div>
                          </div>
                          <div class="col">
                            <div class="tree-param">
                              <div>Story Padding Top ({{ storyPaddingTop }}px)</div>
                              <q-slider
                                v-model="storyPaddingTop"
                                :min="1"
                                :max="25"
                                @input="
                                  (val) => {
                                    setStoryPaddingTop(val)
                                  }
                                "
                              />
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col">
							<div class="tree-param">
                              <div>Story Padding Bottom ({{ storyPaddingBottom }}px)</div>
                              <q-slider
                                v-model="storyPaddingBottom"
                                :min="1"
                                :max="25"
                                @input="
                                  (val) => {
                                    setStoryPaddingBottom(val)
                                  }
                                "
                              />
                            </div>
                          </div>
                          <div class="col">
							<div class="tree-param">
                              <div>Story Padding Left ({{ storyPaddingLeft }}px)</div>
                              <q-slider
                                v-model="storyPaddingLeft"
                                :min="1"
                                :max="25"
                                @input="
                                  (val) => {
                                    setStoryPaddingLeft(val)
                                  }
                                "
                              />
                            </div>
						  </div>
                          <div class="col">

						  </div>
                        </div>
                      </q-step>
                      </q-step>

                      <q-step
                        :name="5"
                        title="Vertical Connector"
                        icon="img:/statics/callout5off.png"
                        active-icon="img:/statics/callout5.png"
                        done-color="ff7d06"
                        active-color="ff7d06"
                        :done="done1"
                      >
                        <div class="row">
                          <div class="col tree-param">
                            <div>Vertical Connector Color</div>
                            <q-input
                              filled
                              v-model="verticalConnectorColor"
                              class="my-input"
                              dense
                              @change="buildVerticalConnectorStyle"
                            >
                              <template v-slot:append>
                                <q-icon name="colorize" class="cursor-pointer">
                                  <q-popup-proxy
                                    transition-show="scale"
                                    transition-hide="scale"
                                  >
                                    <q-color
                                      v-model="verticalConnectorColor"
                                      @change="
                                        buildVerticalConnectorStyle
                                      "
                                    />
                                  </q-popup-proxy>
                                </q-icon>
                              </template>
                            </q-input>
                          </div>
                          <div class="col">
                            <div class="tree-param">
                              <div>Vertical Connector Size ({{ verticalConnectorSize }}px)</div>
                              <q-slider
                                v-model="verticalConnectorSize"
                                :min="1"
                                :max="20"
                                @input="
                                  buildVerticalConnectorStyle()
                                "
                              />
                            </div>
                          </div>
                          <div class="col">
                            <div class="tree-param">
                              <div>Vertical Connector Style</div>
                              <q-select
                                filled
                                v-model="verticalConnectorStyleModel"
                                :options="connectorOptions"
                                label="Style"
                                color="teal"
                                options-selected-class="text-deep-orange"
                                ref="verticalConnectorStyleSelector"
                                @input="buildVerticalConnectorStyle"
                              >
                              </q-select>
                            </div>
                          </div>
                        </div>
                      </q-step>

                      <q-step
                        :name="6"
                        title="Horizontal Connector"
                        icon="img:/statics/callout6off.png"
                        active-icon="img:/statics/callout6.png"
                        done-color="ff7d06"
                        active-color="ff7d06"
                        :done="done1"
                      >
                        <div class="row">
                          <div class="col">
                            <div class="tree-param">
                              <div>Horizontal Connector Size ({{ horizontalConnectorSize }}px)</div>
                              <q-slider
                                v-model="horizontalConnectorSize"
                                :min="1"
                                :max="20"
                                @input="
                                  buildHorizontalConnectorStyle()
                                "
                              />
                            </div>
                          </div>
                          <div class="col">
                            <div>Horizontal Connector Color</div>
                            <q-input
                              filled
                              v-model="horizontalConnectorColor"
                              class="my-input"
                              dense
                              @change="buildHorizontalConnectorStyle"
                            >
                              <template v-slot:append>
                                <q-icon name="colorize" class="cursor-pointer">
                                  <q-popup-proxy
                                    transition-show="scale"
                                    transition-hide="scale"
                                  >
                                    <q-color
                                      v-model="horizontalConnectorColor"
                                      @change="
                                        buildHorizontalConnectorStyle
                                      "
                                    />
                                  </q-popup-proxy>
                                </q-icon>
                              </template>
                            </q-input>
                          </div>
                          <div class="col">
                            <div class="tree-param">
                              <div>Horizontal Connector Style</div>
                              <q-select
                                filled
                                v-model="horizontalConnectorStyleModel"
                                :options="connectorOptions"
                                label="Style"
                                color="teal"
                                options-selected-class="text-deep-orange"
                                ref="horizontalConnectorStyleSelector"
                                @input="buildHorizontalConnectorStyle"
                              >
                              </q-select>
                            </div>
                          </div>
                        </div>
						<div class="row">
							<div class="col">
								<div class="tree-param">
                              <div>Horizontal Connector Width ({{ horizontalConnectorWidth }}px)</div>
                              <q-slider
                                v-model="horizontalConnectorWidth"
                                :min="13"
                                :max="100"
                                @input="
                                  buildHorizontalConnectorStyle()
                                "
                              />
                            </div>
							</div>
							<div class="col">
								
							</div>
							<div class="col">
								
							</div>
						</div>
                      </q-step>
                      <q-step
                        :name="7"
                        title="Copy Code"
                        icon="img:/statics/callout7off.png"
                        active-icon="img:/statics/callout7.png"
                        done-color="ff7d06"
                        active-color="ff7d06"
                        :done="done1"
                      >
                      <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="appscss" label="App.scss/sass Modification" />
          <q-tab name="componenthtml" label="Component HTML" />
          <q-tab name="copysass" label="SASS Code" />
          <q-tab name="copyscss" label="SCSS Code" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="appscss">
            <div class="text-h6" style="margin-bottom:20px;"><div style="display:inline-block !important;vertical-align:middle;">App.scss/sass Modification</div>
            <q-btn 
            round 
            color="orange-8" 
            size="sm" 
            icon="mdi-clipboard-multiple-outline" 
            style="margin-left:18px;vertical-align:middle;display:inline:block;" 
            v-on:click="copyTextboxToClipboard(textApscss)">
            <q-tooltip>
          Copy to Clipboard
        </q-tooltip>
        
            </q-btn><q-badge color="blue" v-show="copied">
      Copied to clipboard!
    </q-badge>
            </div>
            
            
    <div class="row">
      <div class="col-10">
<q-input
      v-model="textApscss"
      outlined
      type="textarea"
    />  
      </div>
      <div class="col-2">
        
      </div>
      </div>
    
          </q-tab-panel>

          <q-tab-panel name="componenthtml">
            <div class="text-h6">Component HTML</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="copysass">
            <div class="text-h6">SASS Code</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="copyscss">
            <div class="text-h6">SCSS Code</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
        </q-tab-panels>


                      
                      </q-step>
                    </q-stepper>
                  </div>
                </div>
              </template>

              <template v-slot:after>
                <div class="q-pa-md">
                  <div class="text-h4 q-mb-md">After</div>
                  <q-btn color="purple" label="Account Settings">
                    <q-menu>
                      <div class="row no-wrap q-pa-md">
                        <q-color
                          v-model="hexStory"
                          class="my-picker"
                          style="width:100px; !important"
                          @change="
                            (val) => {
                              setStoryColor(val)
                            }
                          "
                        />
                      </div>
                    </q-menu>
                  </q-btn>
                  <q-btn color="purple" label="Account Settings">
                    <q-menu>
                      <div class="row no-wrap q-pa-md">
                        <q-color
                          v-model="hexNode"
                          class="my-picker"
                          style="width:100px; !important"
                          @change="setNodeColor"
                        />
                      </div>
                    </q-menu>
                  </q-btn>
                  <q-btn color="purple" label="Font Settings">
                    <q-menu>
                      <div class="row no-wrap q-pa-md"></div>
                    </q-menu>
                  </q-btn>
                  <q-slider
                    v-model="standard"
                    :min="1"
                    :max="20"
                    style="max-width: 200px;"
                    @input="
                      (val) => {
                        testSlider(val)
                      }
                    "
                  />
                  <q-input v-model="text" filled type="textarea" />
                  <div v-for="n in 20" :key="n" class="q-my-md">
                    {{ n }}. Lorem ipsum dolor sit, amet consectetur adipisicing
                    elit. Quis praesentium cumque magnam odio iure quidem, quod
                    illum numquam possimus obcaecati commodi minima assumenda
                    consectetur culpa fuga nulla ullam. In, libero.
                  </div>
                </div>
              </template>
            </q-splitter>
          </q-page>
        </template>
      </q-splitter>
    </div>
  </div>
</template>

<script>
import { copyToClipboard } from 'quasar'
var codetemplatebase = `This is line 1: {mystandard}
This is line 2
This is line 3`
var codetemplate = codetemplatebase
var tempArrowSize = ''
export default {
  data () {
    return {
      tab: 'appscss',
      copied: false,
      textApscss: '',
      hasTempStyle: false,
      hasTempStyleHz: false,
      splitterOrientation: true,
      text: codetemplate,
      standard: 2,
      arrowColor: '#000000',
      arrowSize: 18,
      arrowLeftMargin: 0,
      iconColor: '#0000dd',
      iconSize: 24,
      iconBottomPadding: 8,
      iconMarginRight: 8,
      nodeColor: '#222222',
      nodeFontSize: 14,
      nodeMarginTop: 8,
      nodePadding: 5,
      nodeWrapModel: 'nowrap',
      storyColor: '#222222',
      storyFontSize: 14,
      storyPaddingTop: 5,
      storyPaddingRight: 1,
      storyPaddingBottom: 8,
      storyPaddingLeft: 5,
      storyWrapModel: 'nowrap',
      verticalConnectorColor: '#333333',
      verticalConnectorSize: 1,
      horizontalConnectorColor: '#333333',
      horizontalConnectorSize: 1,
      horizontalConnectorWidth: 13,
      hexStory: '#37997a',
      hexNode: '#37997a',
      splitterModel: 20, // start at 50%
      splitterModel2: 90,
      step: 1,
      done1: false,
      done2: false,
      done3: false,
      done4: false,
      done5: false,
      done6: false,
      customize: [
        {
          label: 'Good food',
          icon: 'restaurant_menu',
          iconcolor: 'teal-10',
          header: 'generic',
          myid: 'gf1',
          children: [
            {
              label: 'Quality ingredients',
              body: 'story',
              story: 'Our ingredients are sourced locally.',
            },
            {
              label: 'Good recipe',
              body: 'story',
              story: 'Secret family recipes that everyone loves!',
              myid: 'mifo1',
            },
          ],
        },
        {
          label: 'Good service',
          header: 'generic',
          myid: 'gs1',
          // body: 'toggle',
          // caption: 'Why are we as consumers so captivated by stories of great customer service? Perhaps it is because...',
          enabled: false,
          children: [
            {
              label: 'Prompt attention',
              children: [
                { label: 'child node one' },
                { label: 'child node two' },
              ],
            },
            { label: 'Professional waiter' },
          ],
        },
        {
          label: 'Pleasant surroundings',
          myid: 'ps1',
          children: [
            { label: 'Happy atmosphere' },
            { label: 'Good table presentation', header: 'generic' },
            { label: 'Pleasing decor' },
          ],
        },
      ],
      nodeFontModel: 'Arial, Helvetica, sans-serif',
      storyFontModel: 'Arial, Helvetica, sans-serif',
      options: [
        {
          label: 'Arial, Helvetica, sans-serif',
          labelstyle: 'font-family: Arial, Helvetica, sans-serif',
          value: 'Arial, Helvetica, sans-serif',
        },
        {
          label: '"Arial Black", Gadget, sans-serif',
          labelstyle: 'font-family: "Arial Black", Gadget, sans-serif',
          value: '"Arial Black", Gadget, sans-serif',
        },
        {
          label: '"Bookman Old Style", serif',
          labelstyle: 'font-family: "Bookman Old Style", serif',
          value: '"Bookman Old Style", serif',
        },
        {
          label: '"Comic Sans MS", cursive, sans-serif',
          labelstyle: 'font-family: "Comic Sans MS", cursive, sans-serif',
          value: '"Comic Sans MS", cursive, sans-serif',
        },
        {
          label: 'Courier, monospace',
          labelstyle: 'font-family: Courier, monospace',
          value: 'Courier, monospace',
        },
        {
          label: '"Courier New", Courier, monospace',
          labelstyle: 'font-family: "Courier New", Courier, monospace',
          value: '"Courier New", Courier, monospace',
        },
        {
          label: 'Garamond, serif',
          labelstyle: 'font-family: Garamond, serif',
          value: 'Garamond, serif',
        },
        {
          label: 'Georgia, serif',
          labelstyle: 'font-family: Georgia, serif',
          value: 'Georgia, serif',
        },
        {
          label: 'Impact, Charcoal, sans-serif',
          labelstyle: 'font-family: Impact, Charcoal, sans-serif',
          value: 'Impact, Charcoal, sans-serif',
        },
        {
          label: '"Lucida Console", Monaco, monospace',
          labelstyle: 'font-family: "Lucida Console", Monaco, monospace',
          value: '"Lucida Console", Monaco, monospace',
        },
        {
          label: '"Lucida Sans Unicode", "Lucida Grande", sans-serif',
          labelstyle:
            'font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif',
          value: '"Lucida Sans Unicode", "Lucida Grande", sans-serif',
        },
        {
          label: '"MS Sans Serif", Geneva, sans-serif',
          labelstyle: 'font-family: "MS Sans Serif", Geneva, sans-serif',
          value: '"MS Sans Serif", Geneva, sans-serif',
        },
        {
          label: '"MS Serif", "New York", sans-serif',
          labelstyle: 'font-family: "MS Serif", "New York", sans-serif',
          value: '"MS Serif", "New York", sans-serif',
        },
        {
          label: '"Palatino Linotype", "Book Antiqua", Palatino, serif',
          labelstyle:
            'font-family: "Palatino Linotype", "Book Antiqua", Palatino, serif',
          value: '"Palatino Linotype", "Book Antiqua", Palatino, serif',
        },
        {
          label: 'Symbol, sans-serif',
          labelstyle: 'font-family: Symbol, sans-serif',
          value: 'Symbol, sans-serif',
        },
        {
          label: 'Tahoma, Geneva, sans-serif',
          labelstyle: 'font-family: Tahoma, Geneva, sans-serif',
          value: 'Tahoma, Geneva, sans-serif',
        },
        {
          label: '"Times New Roman", Times, serif',
          labelstyle: 'font-family: "Times New Roman", Times, serif',
          value: '"Times New Roman", Times, serif',
        },
        {
          label: '"Trebuchet MS", Helvetica, sans-serif',
          labelstyle: 'font-family: "Trebuchet MS", Helvetica, sans-serif',
          value: '"Trebuchet MS", Helvetica, sans-serif',
        },
        {
          label: 'Verdana, Geneva, sans-serif',
          labelstyle: 'font-family: Verdana, Geneva, sans-serif',
          value: 'Verdana, Geneva, sans-serif',
        },
        {
          label: 'Webdings, sans-serif',
          labelstyle: 'font-family: Webdings, sans-serif',
          value: 'Webdings, sans-serif',
        },
        {
          label: 'Wingdings, "Zapf Dingbats", sans-serif',
          labelstyle: 'font-family: Wingdings, "Zapf Dingbats", sans-serif',
          value: 'Wingdings, "Zapf Dingbats", sans-serif',
        },
      ],
      nodeFontWeightModel: 400,
      storyFontWeightModel: 400,
      nodeFontWeightOptions: [
        {
          label: '100',
          value: '100',
        },
        {
          label: '200',
          value: '200',
        },
        {
          label: '300',
          value: '300',
        },
        {
          label: '400',
          value: '400',
        },
        {
          label: '500',
          value: '500',
        },
        {
          label: '600',
          value: '600',
        },
        {
          label: '700',
          value: '700',
        },
        {
          label: '800',
          value: '800',
        },
        {
          label: '900',
          value: '900',
        },
      ],
      verticalConnectorStyleModel: 'solid',
      horizontalConnectorStyleModel: 'solid',
      connectorOptions: ['solid', 'dotted', 'dashed', 'double'],
      onclick (node) {
        alert(node.label)
      }
    }
  },
  methods: {
    showNodeSelected: function () {
      this.$refs.mytree.setExpanded('Good food', false)
    },
    addStyle: function () {
      this.hasTempStyle = true
      const style = document.createElement('style')
      style.id = 'tempScriptTag'
      style.textContent = '.q-tree__node::after {border-left:5px dotted blue !important;} .q-tree__node-header::before {border-left:5px dotted blue !important;}'
      document.head.append(style)
    },
    removeStyle: function () {
      if (this.hasTempStyle === true) {
        this.hasTempStyle = false
        const tempStyle = document.getElementById('tempScriptTag')
        document.head.removeChild(tempStyle)
      }
    },
    miketest: function () {
      event.preventDefault()
      console.log(event.currentTarget.id)
      // JSON.stringify(this)
    },
    mikeclick: function () {
      event.cancelBubble = true
      console.log('click: ' + event.currentTarget.id)

      // JSON.stringify(this)
    },
    mikedouble: function () {
      // event.cancelBubble = true
      console.log('DOUBLEclick: ' + event.currentTarget.id)
      // JSON.stringify(this)
    },
    setStoryColorold: function (newColor) {
      const titems = document.querySelectorAll('.q-tree__node-body')
      titems.forEach(function (userItem) {
        userItem.style.setProperty('--story-color', newColor)
      })
    },
    setArrowColor: function (newColor) {
      const titems = document.querySelectorAll('.q-tree__arrow')
      titems.forEach(function (userItem) {
        userItem.style.setProperty('--arrow-color', newColor)
      })
    },
    setArrowColorFromText: function (e) {
      const titems = document.querySelectorAll('.q-tree__arrow')
      titems.forEach(function (userItem) {
        userItem.style.setProperty('--arrow-color', e.target.value)
      })
    },
    setArrowSize: function (newSize) {
      const titems = document.querySelectorAll('.q-tree__arrow')
      titems.forEach(function (userItem) {
        userItem.style.setProperty('--arrow-size', newSize + 'px')
      })
      this.textApscss = this.getBaseCss()
    },
    setArrowLeftMargin: function (newSize) {
      const titems = document.querySelectorAll('.q-tree__arrow')
      titems.forEach(function (userItem) {
        userItem.style.setProperty('--arrow-margin', newSize + 'px')
      })
    },
    setIconColor: function (newColor) {
      const titems = document.querySelectorAll('.icon-common')
      titems.forEach(function (userItem) {
        userItem.style.setProperty('--icon-color', newColor)
      })
    },
    setIconColorFromText: function (e) {
      const titems = document.querySelectorAll('.icon-common')
      titems.forEach(function (userItem) {
        userItem.style.setProperty('--icon-color', e.target.value)
      })
    },
    setIconSize: function (newSize) {
      console.log('test icon size')
      const titems = document.querySelectorAll('.icon-common')
      titems.forEach(function (userItem) {
        userItem.style.setProperty('--icon-size', newSize + 'px')
      })
    },
    setIconBottomPadding: function (newSize) {
      console.log('test icon size')
      const titems = document.querySelectorAll('.icon-common')
      titems.forEach(function (userItem) {
        userItem.style.setProperty('--icon-padding-bottom', newSize + 'px')
      })
    },
    setIconMarginRight: function (newSize) {
      console.log('test icon size')
      const titems = document.querySelectorAll('.icon-common')
      titems.forEach(function (userItem) {
        userItem.style.setProperty('--icon-margin-right', newSize + 'px')
      })
    },
    setNodeColorOld: function (newColor) {
      const titems = document.querySelectorAll('.q-tree__node')
      titems.forEach(function (userItem) {
        userItem.style.setProperty('--node-color', newColor)
      })
    },
    setNodeColor: function (newColor) {
      const titems = document.querySelectorAll('.q-tree__node')
      titems.forEach(function (userItem) {
        userItem.style.setProperty('--node-color', newColor)
      })
    },
    setNodeColorFromText: function (e) {
      const titems = document.querySelectorAll('.q-tree__node')
      titems.forEach(function (userItem) {
        userItem.style.setProperty('--node-color', e.target.value)
      })
    },
    setNodeFontFamily: function (newFontFace) {
      // console.log('SET FONT: ' + this.model.value)
      if (this.nodeFontModel !== null) {
        const newFontFamily = this.nodeFontModel.value
        if (newFontFamily !== null) {
          const titems = document.querySelectorAll('.node-common')
          titems.forEach(function (userItem) {
            userItem.style.setProperty('--node-font-family', newFontFamily)
          })
        }
      }
    },
    setNodeFontSize: function (newSize) {
      const titems = document.querySelectorAll('.node-common')
      titems.forEach(function (userItem) {
        userItem.style.setProperty('--node-font-size', newSize + 'px')
      })
    },
    setNodeFontWeight: function (newFontWeight) {
      // console.log('SET FONT: ' + this.model.value)
      if (this.nodeFontWeightModel !== null) {
        const newFontWeight = this.nodeFontWeightModel.value
        if (newFontWeight !== null) {
          const titems = document.querySelectorAll('.node-common')
          titems.forEach(function (userItem) {
            userItem.style.setProperty('--node-font-weight', newFontWeight)
          })
        }
      }
    },
    setNodeMarginTop: function (newMargin) {
      const titems = document.querySelectorAll('.q-tree__node-header')
      titems.forEach(function (userItem) {
        userItem.style.setProperty('--node-margin-top', newMargin + 'px')
      })
    },
    setNodePadding: function (newPadding) {
      const titems = document.querySelectorAll('.q-tree__node-header')
      titems.forEach(function (userItem) {
        userItem.style.setProperty('--node-padding', newPadding + 'px')
      })
    },
    setNodeWrap: function (wrap) {
      const titems = document.querySelectorAll('.node-common')
      titems.forEach(function (userItem) {
        userItem.style.setProperty('--node-wrap', wrap)
      })
    },
    setStoryColor: function (newColor) {
      const titems = document.querySelectorAll('.q-tree__node-body')
      titems.forEach(function (userItem) {
        userItem.style.setProperty('--story-color', newColor)
      })
    },
    setStoryColorFromText: function (e) {
      const titems = document.querySelectorAll('.q-tree__node-body')
      titems.forEach(function (userItem) {
        userItem.style.setProperty('--story-color', e.target.value)
      })
    },
    setStoryFontFamily: function (newFontFace) {
      // console.log('SET FONT: ' + this.model.value)
      if (this.storyFontModel !== null) {
        const newFontFamily = this.storyFontModel.value
        if (newFontFamily !== null) {
          const titems = document.querySelectorAll('.q-tree__node-body')
          titems.forEach(function (userItem) {
            userItem.style.setProperty('--story-font-family', newFontFamily)
          })
        }
      }
    },
    setStoryFontSize: function (newSize) {
      const titems = document.querySelectorAll('.q-tree__node-body')
      titems.forEach(function (userItem) {
        userItem.style.setProperty('--story-font-size', newSize + 'px')
      })
    },
    setStoryFontWeight: function (newFontWeight) {
      console.log('SET WEIGHT: ' + this.storyFontWeightModel.value)
      if (this.storyFontWeightModel !== null) {
        const newFontWeight = this.storyFontWeightModel.value
        if (newFontWeight !== null) {
          const titems = document.querySelectorAll('.q-tree__node-body')
          titems.forEach(function (userItem) {
            userItem.style.setProperty('--story-font-weight', newFontWeight)
          })
        }
      }
    },
    setStoryPaddingTop: function (newPadding) {
      const titems = document.querySelectorAll('.q-tree__node-body')
      titems.forEach(function (userItem) {
        userItem.style.setProperty('--story-padding-top', newPadding + 'px')
      })
    },
	setStoryPaddingBottom: function (newPadding) {
      const titems = document.querySelectorAll('.q-tree__node-body')
      titems.forEach(function (userItem) {
        userItem.style.setProperty('--story-padding-bottom', newPadding + 'px')
      })
    },
	setStoryPaddingLeft: function (newPadding) {
      const titems = document.querySelectorAll('.q-tree__node-body')
      titems.forEach(function (userItem) {
        userItem.style.setProperty('--story-padding-left', newPadding + 'px')
      })
    },
    setStoryWrap: function (wrap) {
      const titems = document.querySelectorAll('.q-tree__node-body')
      titems.forEach(function (userItem) {
        userItem.style.setProperty('--story-wrap', wrap)
      })
    },
    setVerticalConnectorColor: function (newColor) {
      const titems = document.querySelectorAll('.icon-common')
      titems.forEach(function (userItem) {
        userItem.style.setProperty('--vert-color', newColor)
      })
    },
    buildVerticalConnectorStyle: function () {
      // verticalConnectorStyle
      // console.log('color: ' + this.verticalConnectorColor + ' size: ' + this.verticalConnectorSize + ' model: ' + JSON.stringify(this.verticalConnectorStyleModel))
      let tempColor = this.verticalConnectorColor
      let tempSize = this.verticalConnectorSize
      let tempStyle = this.verticalConnectorStyleModel
      let tempStyleTemplate = `.q-tree__node::after {
          border-left:${tempSize}px ${tempStyle} ${tempColor} !important;
        } 
        .q-tree__node-header::before {
          border-left:${tempSize}px ${tempStyle} ${tempColor} !important;
        }`
      if (this.hasTempStyle === true) {
        this.hasTempStyle = false
        const tempStyle = document.getElementById('tempScriptTag')
        document.head.removeChild(tempStyle)
      }
      this.hasTempStyle = true
      const style = document.createElement('style')
      style.id = 'tempScriptTag'
      // style.textContent = '.q-tree__node::after {border-left:5px dotted blue !important;} .q-tree__node-header::before {border-left:5px dotted blue !important;}'
      style.textContent = tempStyleTemplate
      document.head.append(style)
    },
    buildHorizontalConnectorStyle: function () {
      // verticalConnectorStyle
      // console.log('color: ' + this.verticalConnectorColor + ' size: ' + this.verticalConnectorSize + ' model: ' + JSON.stringify(this.verticalConnectorStyleModel))
      let tempColor = this.horizontalConnectorColor
      let tempSize = this.horizontalConnectorSize
      let tempWidth = this.horizontalConnectorWidth
      let tempStyle = this.horizontalConnectorStyleModel
      let tempPosition = tempWidth * -1
      let tempPad = tempWidth - 13
      // console.log('test' + tempPosition)
      let tempStyleTemplate = `.q-tree__node-header::before {
          border-bottom:${tempSize}px ${tempStyle} ${tempColor} !important;
          width: ${tempWidth}px !important;
          left: ${tempPosition}px !important;
        }
        .tree-wrapper .q-tree__node--parent {
          padding-left: ${tempPad}px;
          }`
      if (this.hasTempStyleHz === true) {
        this.hasTempStyleHz = false
        const tempStyle = document.getElementById('tempScriptTagHz')
        document.head.removeChild(tempStyle)
      }
      this.hasTempStyleHz = true
      const style = document.createElement('style')
      style.id = 'tempScriptTagHz'
      // style.textContent = '.q-tree__node::after {border-left:5px dotted blue !important;} .q-tree__node-header::before {border-left:5px dotted blue !important;}'
      style.textContent = tempStyleTemplate
      document.head.append(style)
      const titems = document.querySelectorAll('.q-tree__node--child')
      titems.forEach(function (userItem) {
        userItem.style.setProperty('--node-padding-left', tempPad + 'px')
      })
      // const titemslink = document.querySelectorAll('.q-tree__node--link')
      // const titemslink = document.querySelectorAll('.tree-wrapper.q-tree__node--parent')
      // console.log('BEGIN')
      // titemslink.forEach(function (userItemLink) {
      //  console.log(userItemLink.outerHTML)
      //  userItemLink.style.setProperty('padding-left', tempPad + 'px !important')
      // })
    },
    testSlider: function (newVal) {
      console.log('testslider: ' + newVal)
      codetemplate = codetemplatebase.replace('{mystandard}', newVal)
      this.text = codetemplate
      // const newSliderValue = this.model.standard
      // console.log('NEW VAL: ' + newSliderValue)
    },
    copyTextboxToClipboard: function (newText) {
      copyToClipboard(newText)
      .then(() => {
        // success!
        this.copied = true
          clearTimeout(this.timer)
          this.timer = setTimeout(() => {
            this.copied = false
            this.timer = null
          }, 2000)
      })
      .catch(() => {
        // fail
      })
    },
    getBaseCss: function () {
  return `$arrow-color: var(--arrow-color);
	$arrow-size: ${this.arrowSize}px;
	$arrow-margin: var(--arrow-margin);
	$vert-color: var(--vert-color);
	$vert-width: var(--vert-width);
	$vert-style: var(--vert-style);
	$hrz-color: var(--hrz-color);
	$hrz-width: var(--hrz-width);
	$hrz-style: var(--hrz-style);
	$vert-position: var(--vert-position); // SETTING 1 OF 4 NEEDS TO CHANGE TOGETHER. vertical node connector line left position
	$el-position: var(--el-position); // SETTING 2 OF 4 NEEDS TO CHANGE TOGETHER. node 'el' line left position
	$el-width: var(--el-width); // SETTING 3 OF 4 NEEDS TO CHANGE TOGETHER. node 'el' line width
	$node-padding-left: var(--node-padding-left); // SETTING 4 OF 4 NEEDS TO CHANGE TOGETHER. entire node "position"
	$icon-color: var(--icon-color);
	$icon-size: var(--icon-size);
	$icon-padding-bottom: var(--icon-padding-bottom);
	$icon-margin-right: var(--icon-margin-right);
	$node-color: var(--node-color);
	$node-font-family: var(--node-font-family);
	$node-font-size: var(--node-font-size);
	$node-font-weight: var(--node-font-weight);
	$node-margin-top: var(--node-margin-top);
	$node-padding: var(--node-padding);
	$node-wrap: var(--node-wrap);
	$story-padding-top: var(--story-padding-top);
	$story-padding-right: var(--story-padding-right);
	$story-padding-bottom: var(--story-padding-bottom);
	$story-padding-left: var(--story-padding-left);
	$story-color: var(--story-color) !important;
	$story-font-family: var(--story-font-family);
	$story-font-size: var(--story-font-size);
	$story-font-weight: var(--story-font-weight);
	$story-wrap: var(--story-wrap);
	.tree-wrapper {
	  .node-common {
		white-space: $node-wrap;
		color: $node-color;
		font-family: $node-font-family;
		font-size: $node-font-size;
		font-weight: $node-font-weight;
		margin-left: -0x;
		// color:pink !important;
	  }

	  .icon-common {
		font-size: $icon-size !important;
		padding-bottom: $icon-padding-bottom;
		margin-right: $icon-margin-right;
		color:$icon-color !important;
	  }
	  .q-tree {
		position: relative;
		color: $blue;

		&__node {
		  padding: 0 0 3px $node-padding-left; // this adjusts entire node position
		  // border-left: solid 2px green;
		  // margin-left: -0px;
	// the following is the left vertical
		  &:after {
			content: "";
			position: absolute;
			top: -4px;
			bottom: 0;
			width: 2px;
			right: auto;
			left: $vert-position; // part of left position adjust
			border-left: $vert-width $vert-style $vert-color;
		  }

		  &:last-child:after {
			display: none;
		  }

		  &--disabled {
			pointer-events: none;

			.disabled {
			  opacity: 1 !important;
			}

			> div,
			> i,
			> .disabled {
			  opacity: 0.6 !important;

			  .q-tree__node--disabled {
				> div,
				> i,
				> .disabled {
				  opacity: 1 !important;
				}
			  }
			}
		  }
		}
	// the following adjusts the vert/horiz line before a node
		&__node-header:before {
		  content: "";
		  position: absolute;
		  top: -4px;
		  bottom: 50%;
		  width: $el-width; // part of left position adjust
		  left: $el-position; // part of left position adjust
		  border-left: $vert-width $vert-style $vert-color;
		  border-bottom: $hrz-width $hrz-style $hrz-color;
		  
		}
	// entire child node
		&__children {
		  padding-left: 25px; // part of left position adjust (for entire tree)
		}
	// "story"/body nodes
		&__node-body {
		  padding: $story-padding-top $story-padding-right $story-padding-bottom $story-padding-left;
		  font-size: $story-font-size;
		  font-family: $story-font-family;
		  font-weight: $story-font-weight;
		  color: $story-color;
		  white-space: $story-wrap;
		}

		&__node--parent {
		  padding-left: 2px;

		  > .q-tree__node-header:before {
			width: 15px;
			left: -15px;
		  }

		  > .q-tree__node-collapsible > .q-tree__node-body {
			padding: 5px 0 8px 27px;
			
			&:after {
			  content: "";
			  position: absolute;
			  top: 0;
			  width: 2px;
			  height: 100%;
			  right: auto;
			  left: 12px;
			  border-left: 1px solid currentColor;
			  bottom: 50px;
			}
		  }
		}

		&__node--link {
		  cursor: pointer;
		}
	// adjust below to tighten up nodes padding and margin top was at 4px
		&__node-header {
		  padding: $node-padding;
		  margin-top: $node-margin-top;
		  border-radius: $generic-border-radius;
		  outline: 0;
		}

		&__node-header-content {
		  color: #000;
		  transition: color 0.3s;
		}

		&__node--selected .q-tree__node-header-content {
		  color: $grey;
		}

		&__icon, &__node-header-content .q-icon, &__spinner {
		  font-size: 21px;
		}

		&__img {
		  height: 42px;
		}

		&__avatar, &__node-header-content .q-avatar {
		  font-size: 28px;
		  border-radius: 50%;
		  width: 28px;
		  height: 28px;
		}

		&__arrow, &__spinner {
		  font-size: 16px;
		}

		&__arrow {
		  font-size: $arrow-size;
		  color: $arrow-color;
		  margin-left: $arrow-margin;
		  transition: transform 0.3s;

		  &--rotate {
			transform: rotate3d(0, 0, 1, 90deg);
		  }
		}

		// remove connectors before root
		> .q-tree__node {
		  padding: 0;

		  &:after, > .q-tree__node-header:before {
			display: none;
		  }
		}

		// leave space for root empty node
		> .q-tree__node--child > .q-tree__node-header {
		  padding-left: 24px;
		}

		&--dark .q-tree__node-header-content {
		  color: #fff;
		}

		&--no-connectors {
		  .q-tree__node:after,
		  .q-tree__node-header:before,
		  .q-tree__node-body:after {
			display: none !important;
		  }
		}
	  }

	  [dir=rtl] {
		.q-tree__arrow {
		  transform: rotate3d(0, 0, 1, 180deg) #{"/* rtl:ignore */"};

		  &--rotate {
			transform: rotate3d(0, 0, 1, 90deg) #{"/* rtl:ignore */"};
		  }
		}
	  }
	}`
}
  },
}
// function decycle (obj, stack = []) {
//   if (!obj || typeof obj !== 'object') {
//     return obj
//   }
//   if (stack.includes(obj)) {
//     return null
//   }
//   const s = stack.concat([obj])

//   return Array.isArray(obj)
//     ? obj.map(x => decycle(x, s))
//     : Object.fromEntries(
//       Object.entries(obj)
//         .map(([k, v]) => [k, decycle(v, s)]))
// }

</script>
