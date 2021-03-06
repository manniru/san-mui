/**
 * @file chip test case
 * @author zhangsiyuan(zhangsiyuan@baidu.com)
 */

import {expect} from 'chai';
import san from 'san';
import Chip from 'src/Chip';

describe('Chip', () => {
    const viewport = document.createElement('div');
    const createComponent = function (options) {
        const Component = san.defineComponent(
            Object.assign({
                components: {
                    'sm-chip': Chip
                },
                initData() {
                    return {};
                }
            }, options)
        );
        const component = new Component();
        component.attach(viewport);
        return component;
    };

    beforeEach(() => {
        document.body.appendChild(viewport);
    });
    afterEach(() => {
        viewport.remove();
    });

    it('chip element', () => {
        const component = new Chip();
        component.attach(viewport);
        expect(component.el.tagName).to.equal('DIV');
        expect(component.el.className).to.equal('sm-chip state-normal');
        expect(component.data.get('showDelete')).to.equal(false);
        expect(component.data.get('disabled')).to.equal(false);
        component.dispose();
    });

    it('should chip can handleDelete', done => {
        let component = createComponent({
            template: `<div>
                <sm-chip 
                    showDelete
                    on-delete="handleDelete($event)"
                    on-click="handleClick"
                    s-ref="chip">delete chip</sm-chip>
            </div>`,
            initData() {
                return {
                    delete: 0
                };
            },
            handleDelete() {
                this.data.set('delete', 1);
            },
            attached() {
                document.getElementsByClassName('sm-chip-delete-icon-wrapper')[0].click();
            }
        });
        setTimeout(() => {
            expect(component.data.get('delete')).to.equal(1);
            done();
        }, 50);
    });
    it('should disabled chip cannot handleClick', done => {
        let component = createComponent({
            template: `<div>
                <sm-chip 
                    disabled
                    on-click="handleClick"
                    s-ref="chip">disabled chip</sm-chip>
            </div>`,
            initData() {
                return {
                    clicked: 0
                };
            },
            handleClick() {
                this.data.set('clicked', 1);
            },
            attached() {
                this.ref('chip').el.click();
            }
        });
        setTimeout(() => {
            expect(component.data.get('clicked')).to.equal(0);
            done();
        }, 50);
    });
});
