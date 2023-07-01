import './terms.page.css';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../hooks';

const Terms = () => {

    const navigate = useNavigate();
    const { setNotification } = useNotification();

    const navigateSignup = () => {

        navigate('/signup');
    };

    const alarmUser = () => {

        setNotification({ message: "You should accept the terms of service 🔫 🕱" });
    };

    return (
        <div className="wrapper flex_align_justify">
            <div className="terms_service">

                <div className="tc_item tc_head flex_align_justify">
                    <div className="text">
                        <h2>POINT OF SALE TERMS OF SERVICE</h2>
                        <p>Last updated on June 26 2023</p>
                    </div>
                </div>

                <div className="tc_item tc_body">

                    <ol>
                        <li>
                            <h3> THE SERVICE</h3>
                            <p>Point of Sale is a web-based point of sale system for small businesses to keep track of their inventory, sales, and customers (the “Service”). By logging onto the Site and/or using the Service, the User agrees to these Terms of Use and associated Privacy Policy located elsewhere on the Site.</p>
                        </li>

                        <li>
                            <h3>ELIGIBILITY</h3>
                            <ol type="a">
                                <li> To be eligible to browse the Site and use the Service, the User must be at least 18 years of age.</li>
                                <li> The User must provide information that is truthful to the best of the User’s knowledge and in the event any such information changes, the User shall notify the Company of any such change within a reasonable amount of time.</li>
                                <li> The User may not through the Site use false identities, impersonate any other person, or use a username and password that the User is not authorized to use.</li>
                            </ol>
                        </li>

                        <li>
                            <h3>GENERAL RESTRICTIONS ON USE</h3>
                            <ol type="a">
                                <li> The Company grants the User a limited license to access and make personal use of the Site and not to download (other than page caching) or modify it (or any portion thereof) except with express written consent of the Company. This license does not include any resale or commercial use of the Site or its contents, any collection and use of any product listings, descriptions, or prices, any derivative use of this site or its contents, any downloading or copying of account information for the benefit of another merchant, or any use of data mining, robots, or similar data gathering and extraction tools.</li>
                                <li> The User agrees not to use any device, software or other instrumentality to interfere or attempt to interfere with the proper working of the Site. The User will not take any action that imposes an unreasonable or disproportionately large load on the Site’s infrastructure. The User agrees not to use any robot, spider, other automatic device, or manual process to monitor or copy any content from the Site without the prior express consent from an authorized Company representative, unless such use is by a search engine employed to direct Internet users to the Site.</li>
                                <li> The Site or any portion thereof may not be reproduced, duplicated, copied, sold, resold, visited, or otherwise exploited for any commercial purpose without express written consent of the Company. The User may not frame or utilize framing techniques to enclose any trademark, logo, or other proprietary information (including images, text, page layout, or form) of the Company or its associates without express written consent. The User may not use any meta tags or any other "hidden” text utilizing the Company’s name or trademarks without the express written consent of the Company.</li>
                                <li>Any unauthorized use terminates the permission or license granted by the Company. The User is granted a limited, revocable, and nonexclusive right to create a hyperlink to the Site so long as the link does not portray the Company, its associates, or their products or services in a false, misleading, derogatory, or otherwise offensive matter.</li>
                            </ol>
                        </li>

                        <li>
                            <h3>USER ACCOUNT</h3>
                            <p>The User may register to the Site with an account in order to make use of certain functions and/or the Service (the “User Account”). The User is responsible for maintaining the confidentiality of the username and password that the User designates during the registration process, and the User is fully responsible for all activities that occur under the User Account. The User agrees to: (i) immediately notify the Company of any unauthorized use of the User Account or any other breach of security, and (ii) ensure that the User exits from the User Account at the end of each session. The Company will not be liable for any loss or damage arising from the User’s failure to comply with this provision. The User should use particular caution when accessing the User Account from a public or shared computer to ensure that others are not able to view or record the User Account’s username and password and/or other personal information. The Company reserves the right to terminate or suspend any User’s User Account and/or access to the Site and the Service if the Company determines (in its sole discretion) that any such User has violated this Agreement.</p>
                        </li>

                        <li>
                            <h3> USER LICENSE</h3>
                            <p>Each User Account shall correspond with one (1) license to use the PHP Point of Sale software at one (1) location. Additional licenses may be purchased by registering for additional accounts. Please see the PHP Point of Sale EULA for detailed information regarding the license.</p>
                        </li>

                        <li>
                            <h3> PRICING</h3>
                            <p> We reserve the right to raise prices for cloud/hosted version with a 30-day notice of price increase via email.</p>

                        </li>

                        <li>
                            <h3> TERM AND TERMINATION </h3>
                            <p> This Agreement will remain in effect until terminated by either party. If the User is dissatisfied with the Service or any of the terms and conditions contained herein, the sole and exclusive remedy is to terminate the User Account. The User may cancel the User Account and participation in the Service at any time by emailing support@phppointofsale.com or canceling through the User’s PayPal account. Notwithstanding anything contained in this Agreement to the contrary, the Company may, in its sole discretion, terminate the User Account, and discontinue the User’s participation in the Service. Reasons for the Company’s determination to so terminate or discontinue the User’s Account or participation as provided for above, include, but are not limited to, if the Company believes that the User has violated this Agreement or other policies or guidelines of the Service or that of any other party, or if the Company believes that the User’s conduct may be harmful to other consumers, advertisers or licensees who participate in or facilitate the Service.</p>
                        </li>

                        <li>
                            <h3> INTELLECTUAL PROPERTY </h3>
                            <p>  The Site holds certain content, such as text, graphics, logos, button icons, images, audio clips, data compilations, and software, that is the property of the Company or its content suppliers and protected by international copyright laws. The Site may contain or reference trademarks, patents, copyrighted materials, trade secrets, technologies, products, processes or other proprietary rights belonging to Company and/or other parties. No license to or right in any such trademarks, patents, copyrighted materials, trade secrets, technologies, products, processes and other proprietary rights of Company and/or other parties is granted to or conferred upon the User. To notify the Company of any copyright-infringing content, please contact us at support@pointofsale.com.</p>
                        </li>

                        <li>
                            <h3>  COMMUNICATIONS</h3>
                            <p>The Company shall be free to reproduce, use, disclose, and distribute any and all communication conducted with Company through the Site including but not limited to feedback, questions, comments, suggestions and the like (the “Communications”). The User shall have no right of confidentiality in the Communications and the Company shall have no obligation to protect the Communications from disclosure. The Company shall be free to use any ideas, concepts, know-how, content or techniques contained in the Communications for any purpose whatsoever, including but not limited to the development, production and marketing of products and services that incorporate such information.</p>
                        </li>

                        <li>
                            <h3> LIMITED LIABILITY</h3>
                            <p> UNDER NO CIRCUMSTANCES SHALL THE COMPANY BE LIABLE TO THE USER OR ANY OTHER PERSON FOR ANY INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL OR PUNITIVE DAMAGES FOR ANY MATTER ARISING FROM OR RELATING TO THIS AGREEMENT, THE SITE, ANY SERVICE OFFERED BY THE COMPANY, THE PHP POINT OF SALE SOFTWARE, OR THE INTERNET GENERALLY, INCLUDING, BUT NOT LIMITED TO: (A) ANY PARTY’S USE OR INABILITY TO USE THE SITE; (B) ANY CHANGES TO OR INACCESSIBILITY OF THE SITE; (C) ANY LOSS, DELAY, FAILURE, UNAUTHORIZED ACCESS TO OR ALTERATION OF ANY DATA OR ANY TRANSMISSION OF DATA; (D) ANY CONTENT OR DATA TRANSMITTED OR RECEIVED (OR NOT TRANSMITTED OR RECEIVED) BY/FROM ANY PARTY; AND/OR (E) ANY CONTENT OR DATA FROM A THIRD PERSON ACCESSED ON OR THROUGH THE SITE, OR THE SERVICE; WHETHER SUCH LIABILITY IS ASSERTED ON THE BASIS OF CONTRACT, TORT OR OTHERWISE. SOME JURISDICTIONS PROHIBIT THE EXCLUSION OR LIMITATION OF INCIDENTAL OR CONSEQUENTIAL DAMAGES, THUS THIS LIMITATION OF LIABILITY MAY NOT APPLY TO USER.</p>
                        </li>

                        <li>
                            <h3> DISCLAIMER OF WARRANTIES </h3>
                            <p>THIS SITE IS PROVIDED “AS IS” WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. USE OF THIS SITE AND ANY SERVICE OFFERED BY THE COMPANY IS AT THE USER’S SOLE RISK. THE COMPANY MAKES NO WARRANTIES, INCLUDING, BUT NOT LIMITED TO: (A) ANY IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE OR NON-INFRINGEMENT; (B) THAT THE SITE, OR THE SERVICE WILL MEET THE USER’S REQUIREMENTS; (C) THAT THE SITE WILL BE SECURE, UNINTERRUPTED, ACCESSIBLE OR ERROR-FREE; AND/OR (D) THAT ANY INFORMATION, DATA OR CONTENT OBTAINED FROM THE SITE, OR THE SERVICE WILL BE ACCURATE, RELIABLE, COMPLETE, TIMELY OR FREE FROM VIRUSES OR OTHER FORMS OF DESTRUCTIVE CODE. NO ADVICE OR INFORMATION OBTAINED BY THE USER FROM THE COMPANY, WHETHER IN ORAL, WRITTEN OR ELECTRONIC FORM, RELATING TO THE USER’S USE OF THIS SITE, THE SERVICES SHALL CREATE ANY WARRANTY NOT EXPRESSLY STATED IN THIS AGREEMENT.</p>
                        </li>

                        <li>
                            <h3> INDEMNIFICATION </h3>
                            <p>The User agrees to indemnify, hold harmless and defend the Company, along with its directors, employees and agents from and against any action, cause, claim, damage, debt, demand or liability, including reasonable costs and attorney's fees, asserted by any person or entity, arising out of or relating to: (i) this Agreement and/or any breach or threatened breach by the User; (ii) the User’s use of the Site or any service offered by the Company; (iii) any unacceptable, unlawful, or objectionable use of the Site or any service offered to the User by the Company; or (iv) any negligent or willful misconduct by the User.</p>
                        </li>

                        <li>
                            <h3> ERRORS AND OMISSIONS</h3>
                            <p>The Site may contain technical inaccuracies and typographical errors, including but not limited to inaccuracies relating to pricing or availability applicable to certain products or services offered by the Company. The Company shall not assume responsibility or liability for any such inaccuracies, errors or omissions, and shall have no obligation to honor reservations or information affected by such inaccuracies. The Company reserves the right to make changes, corrections, cancellations and/or improvements to any information contained on the Site, and to the products and programs described in such information, at any time without notice, including after confirmation of a transaction.</p>
                        </li>

                        <li>
                            <h3>PRODUCTS AND SERVICES</h3>
                            <p>The Site may contain information about products and services offered by the Company, not all of which are available in every location. Any reference to a Company product or service on the Site does not imply that such product or service is or will be available in the User’s location.</p>
                        </li>

                        <li>
                            <h3> THIRD PARTY LINKS</h3>
                            <p> There are links on the Site that lead to third party sites, including those of advertisers. THE COMPANY IS NOT RESPONSIBLE FOR THE PRIVACY POLICIES OF THOSE SITES OR THE COOKIES THOSE SITES USE. IN ADDITION, BECAUSE THE COMPANY HAS NO CONTROL OVER SUCH SITES AND RESOURCES, THE USER ACKNOWLEDGES AND AGREES THAT THE COMPANY IS NOT RESPONSIBLE FOR THE AVAILABILITY OF SUCH EXTERNAL SITES OR RESOURCES, AND DOES NOT ENDORSE AND IS NOT RESPONSIBLE OR LIABLE FOR ANY CONTENT, ADVERTISING, PRODUCTS, OR OTHER MATERIALS ON OR AVAILABLE FROM SUCH SITES OR RESOURCES.</p>
                        </li>

                        <li>
                            <h3>  MODIFICATION</h3>
                            <p> The Company has the right at any time or from time to time to modify or amend this Agreement. Should the Company choose to modify this Agreement the Site will display such changes, which will be User’s only notification of any such change. Any use of the Site or the Service by User after such notification shall constitute User’s acceptance of the modified or amended terms. No modification to this Agreement made by User shall be binding upon the Company.</p>
                        </li>

                        <li>
                            <h3> FORCE MAJEURE </h3>
                            <p> In the event that either Party is unable to perform any of its obligations under this Agreement or to enjoy any of its benefits because of natural disaster, terrorism, fire, explosion, power blackout, earthquake, flood, the elements, strike, embargo, labor disputes, acts of civil or military authority, war, acts of God, acts or omissions of carriers or suppliers, acts of regulatory or governmental agencies, actions or decrees of governmental bodies or communication line failure not the fault of the affected Party or other causes beyond such Party’s reasonable control (a “Force Majeure Event”) the Party who has been so affected shall immediately give notice to the other Party and shall do everything possible to resume performance. Upon receipt of such notice, all obligations under this Agreement shall be immediately suspended. If the period of nonperformance exceeds seven (7) days from the receipt of notice of the Force Majeure Event, the Party whose ability to perform has not been so affected may by giving written notice immediately terminate this Agreement.</p>
                        </li>

                        <li>
                            <h3> SEVERABILITY</h3>
                            <p> If any provision of this Agreement is held to be invalid, illegal, or unenforceable for any reason, such invalidity, illegality or unenforceability shall not affect any other provisions of this Agreement, and this Agreement shall be construed as if such invalid, illegal or unenforceable provision had not been contained herein.</p>
                        </li>

                        <li>
                            <h3> VENUE </h3>
                            <p>The interpretation of this Agreement shall be governed by the laws of the State of New York. Any action arising under this Agreement shall be brought in the applicable State court located in Monroe County, New York.</p>
                        </li>

                        <li>
                            <h3> SUPPORT</h3>
                            <p> Point of sale support will help installing, configuring, and general questions about hardware and software. We will NOT do custom development for our product but can give a general guide on where/how to modify in many cases.</p>
                        </li>

                    </ol>
                </div>
                <div className="tc_item tc_foot flex_align">
                    <button className="decline_btn" onClick={alarmUser}>Decline</button>
                    <button className="accept_btn" onClick={navigateSignup}>Accept</button>
                </div>
            </div>
        </div >
    );
};
export default Terms; 